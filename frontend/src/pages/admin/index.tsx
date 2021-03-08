import styles from './Admin.module.css'
import { AppLoader, Button, Layout, Table, TextInput, PtypeRow, YesCancelModal } from 'components'
import { useLanguage } from 'hooks'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Sortable from 'sortablejs'
import {
  createPtype,
  getAllPtypes,
  updatePtype,
  deleteOnePtype,
  getAllUsers,
  deleteOneUser,
  createUser,
  updateUser
} from 'api'
import { Types } from '../../types'
import EditPtypeForm from '../../adminPanel/components/EditPtypeForm/EditPtypeForm'
import IconSelectingForm from '../../adminPanel/components/IconSelectingForm/IconSelectingForm'
import UserRow from '../../adminPanel/components/UserRow/UserRow'
import EditUserForm from '../../adminPanel/components/EditUserForm/EditUserForm'
import { verifyPassword, verifyPtypeName, verifyUsername } from 'utils'

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
  const [isIconModalOpened, setIsIconModalOpened] = useState(false)
  const [users, setUsers] = useState([])
  const [isUserDeleteModalOpened, setIsUserDeleteModalOpened] = useState(false)
  const [userDelCandidate, setUserDelCandidate] = useState('')
  const [userForm, setUserForm] = useState<Types.UserToCreate>({} as Types.UserToCreate)
  const [isUserEditModalOpened, setIsUserEditModalOpened] = useState(false)
  const [editedUser, setEditedUser] = useState<Types.UserToUpdate>({} as Types.UserToUpdate)

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
      setIsLoading(true)
      const ptypes = await getAllPtypes(state.user.token)
      const users = await getAllUsers(state.user.token)
      setPtypes(ptypes)
      setUsers(users)
      setIsLoading(false)
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

  const selectIconHandler = (ptype: Types.Ptype) => {
    setEditedPtype(ptype)
    setIsIconModalOpened(true)
  }

  const confirmIcon = async (icon: string) => {
    try {
      setIsLoading(true)
      await updatePtype(editedPtype._id, { icon }, state.user.token)
      setIsIconModalOpened(false)
      editedPtype.icon = icon
      setPtypes(ptypes)
      setIsLoading(false)
    } catch (e) {
      console.log(e.message)
    }
  }

  const deleteUserHandler = (userId: string) => {
    setUserDelCandidate(userId)
    setIsUserDeleteModalOpened(true)
  }

  const deleteUser = async () => {
    try {
      setIsLoading(true)
      await deleteOneUser(userDelCandidate, state.user.token)
      setUsers(users.filter(user => user._id !== userDelCandidate))
      setIsUserDeleteModalOpened(false)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const addUserHandler = async () => {
    try {
      setIsLoading(true)
      const user = await createUser(userForm, state.user.token)
      setUsers([...users, user])
      setUserForm({} as Types.UserToCreate)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const updateUserHandler = (user: Types.UserToUpdate) => {
    setIsUserEditModalOpened(true)
    setEditedUser(user)
  }

  const confirmUserEdit = async () => {
    try {
      setIsLoading(true)
      await updateUser(editedUser._id, editedUser, state.user.token)
      setUsers([...users.filter(user => user._id !== editedUser._id), editedUser])
      setIsUserEditModalOpened(false)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const exportPayments = async () => {
    let data = `${lang.DATE};${lang.TYPE};${lang.USER};${lang.PAYMENT}\n`
    state.payments.forEach(payment => {
      data += `${payment.time};${payment.ptype.name};${payment.user?.username ?? '-'};${payment.value}\n`
    })
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
    element.setAttribute('download', 'payments.csv')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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
            <>
              <EditPtypeForm
                isEditModalOpened={isEditModalOpened}
                setIsEditModalOpened={setIsEditModalOpened}
                editedPtype={editedPtype}
                setEditedPtype={v => {
                  if (!verifyPtypeName(v.name)) return
                  setEditedPtype(v)
                }}
                confirmEdit={confirmEdit}
              />
              <IconSelectingForm
                isModalOpened={isIconModalOpened}
                setIsModalOpened={setIsIconModalOpened}
                confirmIcon={confirmIcon}
              />
            </>
          ) : null}
          <div id="selectIconContainer" />
          <div>
            <Button onClick={exportPayments}>Экспортировать платежи</Button>
            <Button onClick={reloadActiveSessions}>Перезагрузить активные сессии</Button>
          </div>
          <h4>Типы платежей</h4>
          <Table
            tbodyId={styles.tbody}
            thead={
              <tr>
                <th />
                <th>Название</th>
                <th>Количество платежей</th>
                <th>Иконка</th>
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
                    selectIconHandler={() => selectIconHandler(ptype)}
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
                onChangeHandler={v => {
                  if (!verifyPtypeName(v)) return
                  setPtype(v)
                }}
                value={ptype}
              />
            </div>
            <Button onClick={addPtypeHandler} disabled={!ptype}>
              Добавить
            </Button>
          </form>
          <br />
          <YesCancelModal
            yesClickHandler={deleteUser}
            noClickHandler={() => setIsUserDeleteModalOpened(false)}
            title="Вы уверены, что хотите удалить данного пользователя?"
            setIsModalOpened={setIsUserDeleteModalOpened}
            isModalOpened={isUserDeleteModalOpened}
          />
          <EditUserForm
            isEditModalOpened={isUserEditModalOpened}
            setIsEditModalOpened={setIsUserEditModalOpened}
            editedUser={editedUser}
            setEditedUser={setEditedUser}
            confirmEdit={confirmUserEdit}
          />
          <h4>Пользователи</h4>
          <Table
            thead={
              <tr>
                <th>Имя пользователя</th>
                <th>Роль</th>
                <th />
              </tr>
            }
            tbody={
              <>
                {users.map(user => (
                  <UserRow
                    user={user}
                    deleteUserHandler={deleteUserHandler}
                    editUserHandler={() => updateUserHandler(user)}
                    key={user._id}
                  />
                ))}
              </>
            }
          />
          <br />
          <form className={styles.add_new_ptype_form}>
            <div>
              <label htmlFor="username">Добавить нового пользователя:</label>
              <TextInput
                placeholder="Введите имя пользователя"
                id="username"
                onChangeHandler={username => {
                  if (!verifyUsername(username)) return
                  setUserForm({ ...userForm, username })
                }}
                value={userForm.username}
              />
            </div>
            <div>
              <label htmlFor="password">&nbsp;</label>
              <TextInput
                placeholder="Введите пароль"
                id="password"
                onChangeHandler={password => {
                  if (!verifyPassword(password)) return
                  setUserForm({ ...userForm, password })
                }}
                value={userForm.password}
              />
            </div>
            <Button onClick={addUserHandler} disabled={!userForm.password?.trim() || !userForm.username?.trim()}>
              Добавить
            </Button>
          </form>
          <br />
        </>
      ) : (
        <AppLoader />
      )}
    </Layout>
  )
}

export default Admin
