import styles from './Admin.module.css'
import { AppLoader, Button, Layout, Table, TextInput, PtypeRow, YesCancelModal } from 'components'
import { useLanguage } from 'hooks'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Sortable from 'sortablejs'
import { createPtype, getAllPtypes, updatePtype, deleteOnePtype } from 'api'
import { Types } from '../../types'
import EditPtypeForm from '../../adminPanel/components/EditPtypeForm/EditPtypeForm'

const Admin = () => {
  const { lang } = useLanguage()
  const { state } = useContext(AppContext)
  const [amountOfPayments, setAmountOfPayments] = useState(0)
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const [deleteCandidate, setDeleteCandidate] = useState('')
  const [isEditModalOpened, setIsEditModalOpened] = useState(false)
  const [editedPtype, setEditedPtype] = useState<Types.PtypeToUpdate>(null)
  const [ptypes, setPtypes] = useState<Types.Ptype[]>([])
  const [ptype, setPtype] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sortable, setSortable] = useState(null)

  const addPtypeHandler = async () => {
    try {
      if (ptypes.find(p => p.name === ptype.trim())) return
      setIsLoading(true)
      const newPtype = await createPtype({ name: ptype.trim() }, state.user.token)
      setPtypes([...ptypes, newPtype])
      setPtype('')
      setIsLoading(false)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    (async () => {
      const ptypes = await getAllPtypes(state.user.token)
      setPtypes(ptypes)
    })()
  }, [])

  const deletePtypeHandler = async (ptype: Types.Ptype) => {
    try {
      if (ptype.payments.length) {
        setAmountOfPayments(ptype.payments.length)
        setDeleteCandidate(ptype._id)
        setIsDeleteModalOpened(true)
      } else {
        setIsLoading(true)
        await deleteOnePtype(ptype._id, state.user.token)
        setIsLoading(false)
        setPtypes(ptypes.filter(p => p._id !== ptype._id))
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    if (!ptypes.length) return
    if (isLoading) {
      sortable?.destroy()
      setSortable(null)
    } else {
      const tbody = document.getElementById(styles.tbody)
      const newSortable = Sortable.create(tbody, {
        ghostClass: styles.ghost,
        handle: '.my-draggable',
        onEnd: async function (evt) {
          setIsLoading(true)
          await updatePtype(ptypes[evt.oldIndex]._id, { sort: +evt.newIndex }, state.user.token)
          await updatePtype(ptypes[evt.newIndex]._id, { sort: +evt.oldIndex }, state.user.token)
          ptypes[evt.oldIndex].sort = +evt.newIndex
          ptypes[evt.newIndex].sort = +evt.oldIndex
          setPtypes(ptypes.sort((p1, p2) => p1.sort - p2.sort))
          setIsLoading(false)
        }
      })
      setSortable(newSortable)
    }
  }, [isLoading, ptypes])

  const deleteConfirmedHandler = async () => {
    try {
      setIsLoading(true)
      await deleteOnePtype(deleteCandidate, state.user.token)
      setPtypes(ptypes.filter(ptype => ptype._id !== deleteCandidate))
      setIsDeleteModalOpened(false)
      setIsLoading(false)
    } catch (e) {
      console.log(e.message)
    }
  }

  const updatePtypeHandler = (ptype: Types.Ptype) => {
    setEditedPtype(ptype)
    setIsEditModalOpened(true)
  }

  const confirmEdit = async () => {
    setIsLoading(true)
    await updatePtype(editedPtype._id, editedPtype, state.user.token)
    setIsEditModalOpened(false)
    ptypes.find(ptype => ptype._id === editedPtype._id).name = editedPtype.name
    setPtypes(ptypes)
    setIsLoading(false)
  }

  const reloadActiveSessions = () => {
    console.log(state.user.socket)
    state.user.socket.emit('action', { token: state.user.token, action: 'update page' })
  }

  return (
    <Layout title={lang.ADMINING}>
      {!isLoading ? (
        <>
          <YesCancelModal
            isModalOpened={isDeleteModalOpened}
            setIsModalOpened={setIsDeleteModalOpened}
            title={`Будет удалено платежей: ${amountOfPayments}. Продолжить?`}
            yesClickHandler={deleteConfirmedHandler}
            noClickHandler={() => setIsDeleteModalOpened(false)}
          />
          {editedPtype ? (
            <EditPtypeForm
              isEditModalOpened={isEditModalOpened}
              setIsEditModalOpened={setIsEditModalOpened}
              editedPtype={editedPtype}
              setEditedPtype={setEditedPtype}
              confirmEdit={confirmEdit}
            />
          ) : null}

          <h4>Типы платежей</h4>
          <Table
            tbodyId={styles.tbody}
            thead={
              <tr>
                <th />
                <th>Название</th>
                <th>Количество платежей</th>
                <th />
              </tr>
            }
            tbody={
              <>
                {ptypes.map(ptype => (
                  <PtypeRow
                    setIsLoading={setIsLoading}
                    ptype={ptype}
                    key={ptype._id}
                    deletePtypeHandler={() => deletePtypeHandler(ptype)}
                    editPaymentHandler={() => updatePtypeHandler(ptype)}
                  />
                ))}
              </>
            }
          />
          <br />
          <form className={styles.add_new_ptype_form}>
            <div>
              <label htmlFor="paymentTypeInput">Добавить новый тип платежа:</label>
              <TextInput
                placeholder="Введите название"
                id="paymentTypeInput"
                onChangeHandler={setPtype}
                value={ptype}
              />
            </div>
            <Button onClick={addPtypeHandler} disabled={!ptype.trim()}>
              Добавить
            </Button>
          </form>
          <br />
          <Button onClick={reloadActiveSessions}>Перезагрузить активные сессии</Button>
        </>
      ) : (
        <AppLoader />
      )}
    </Layout>
  )
}

export default Admin
