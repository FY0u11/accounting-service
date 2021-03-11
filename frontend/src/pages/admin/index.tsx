import { updatePtypeApi } from 'api'
import classNames                                             from 'classnames'
import { useRouter }                                          from 'next/router'
import { useContext, useEffect, useReducer, useState }        from 'react'
import Sortable                                               from 'sortablejs'

import {
  AppLoader,
  Button,
  Layout,
  Table,
  TextInput,
  YesCancelModal
}                                                             from 'components'
import { useApi }                                             from 'hooks'
import { verifyPassword, verifyPtypeName, verifyUsername }    from 'utils'
import styles                                                 from './Admin.module.css'
import {
  useUpdatePtypeIcon,
  useUpdateUser,
  useUpdatePtype,
  useGetAllUsers,
  useGetAllPtypes,
  useDeleteOneUser,
  useDeleteOnePtype,
  useCreateUser,
  useCreatePtype
}                                                             from '../../adminPanel/hooks'
import {
  EditPtypeForm,
  PtypeRow,
  IconSelectingForm,
  EditUserForm,
  UserRow
}                                                             from '../../adminPanel/components'
import { AdminContext }                                       from '../../adminPanel/context/AdminContext'
import { actions }                                            from '../../adminPanel/store/actions'
import { initialState, reducer }                              from '../../adminPanel/store/reducers'
import { AppContext }                                         from '../../context/AppContext'

const Admin = () => {
  const { state }                                             = useContext(AppContext)
  const [adminState, setAdminState]                           = useReducer(reducer, initialState)
  const router                                                = useRouter()
  const [sortable, setSortable]                               = useState(null)
  const { request }                                           = useApi()
  // users
  const { getAllUsers } = useGetAllUsers({ setAdminState })
  const { createUser, userForm, setUserForm } = useCreateUser({ adminState, setAdminState })
  const { deleteOneUser, deleteUserHandler, setIsUserDeleteModalOpened, isUserDeleteModalOpened } = useDeleteOneUser({ adminState, setAdminState })
  const { updateUser, updateUserHandler,setIsUserUpdateModalOpened, isUserUpdateModalOpened, updatedUser, setUpdatedUser  } = useUpdateUser({ adminState, setAdminState })
  // ptypes
  const { getAllPtypes } = useGetAllPtypes({ setAdminState })
  const { createPtype, ptypeName, setPtypeName } = useCreatePtype({ adminState, setAdminState })
  const { deleteOnePtype, deletePtypeHandler, setIsPtypeDeleteModalOpened, isPtypeDeleteModalOpened, amountOfPayments } = useDeleteOnePtype({ adminState, setAdminState })
  const { updatePtype, updatePtypeHandler, setIsPtypeUpdateModalOpened, isPtypeUpdateModalOpened, updatedPtype, setUpdatedPtype } = useUpdatePtype({ adminState, setAdminState })
  const { updatePtypeIcon, updatePtypeIconHandler, isIconModalOpened, setIsIconModalOpened } = useUpdatePtypeIcon({ adminState, setAdminState })

  useEffect(() => {
    (async () => {
      if (state.user.role !== 'admin') return router.push('/')
      try {
        await getAllPtypes()
        await getAllUsers()
      } catch { return }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (state.user.role !== 'admin') return router.push('/')
    })()
  }, [state.user.role])

  useEffect(() => {
    if (!adminState.ptypes.length) return
    if (state.user.role !== 'admin') return
    if (adminState.isLoading) {
      sortable?.destroy()
      setSortable(null)
    } else {
      const tbody = document.getElementById(styles.tbody)
      const newSortable = Sortable.create(tbody, {
        ghostClass: styles.ghost,
        handle: '.my-draggable',
        onEnd: async function (evt) {
          try {
            await request(updatePtypeApi, { _id: adminState.ptypes[evt.oldIndex]._id, sort: +evt.newIndex })
            await request(updatePtypeApi, { _id: adminState.ptypes[evt.newIndex]._id, sort: +evt.oldIndex })
            adminState.ptypes[evt.oldIndex].sort = +evt.newIndex
            adminState.ptypes[evt.newIndex].sort = +evt.oldIndex
            setAdminState(actions.setPtypes(adminState.ptypes.sort((p1, p2) => p1.sort - p2.sort)))
          } catch { return }
        }
      })
      setSortable(newSortable)
    }
  }, [adminState.isLoading, adminState.ptypes])

  const reloadActiveSessions = () => {
    state.user.socket.emit('action', { token: state.user.token, action: 'update page' })
  }

  const exportPayments = async () => {
    let data = `${state.enums.DATE};${state.enums.TYPE};${state.enums.USER};${state.enums.PAYMENT}\n`
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
    <AdminContext.Provider value={{ adminState, setAdminState }}>
      <Layout title={state.enums.ADMINING}>
        {!adminState.isLoading && state.user.role === 'admin' ? (
          <>
            <YesCancelModal
              isModalOpened={isPtypeDeleteModalOpened}
              setIsModalOpened={setIsPtypeDeleteModalOpened}
              title={`${state.enums.WILL_BE_REMOVED_PAYMENTS}: ${amountOfPayments}. ${state.enums.CONTINUE}?`}
              yesClickHandler={() => deleteOnePtype()}
              noClickHandler={() => setIsPtypeDeleteModalOpened(false)}
            />
            {updatedPtype ? (
              <>
                <EditPtypeForm
                  isEditModalOpened={isPtypeUpdateModalOpened}
                  setIsEditModalOpened={setIsPtypeUpdateModalOpened}
                  editedPtype={updatedPtype}
                  setEditedPtype={v => {
                    if (!verifyPtypeName(v.name)) return
                    setUpdatedPtype(v)
                  }}
                  confirmEdit={updatePtype}
                />
                <IconSelectingForm
                  isModalOpened={isIconModalOpened}
                  setIsModalOpened={setIsIconModalOpened}
                  confirmIcon={updatePtypeIcon}
                />
              </>
            ) : null}
            <div id="selectIconContainer" />
            <div className={styles.responsive_wrapper}>
              <Button onClick={exportPayments}>{state.enums.EXPORT_PAYMENTS}</Button>
              <Button onClick={reloadActiveSessions}>{state.enums.RELOAD_SESSIONS}</Button>
            </div>
            <h4>{state.enums.PAYMENT_TYPES}</h4>
            <Table
              tbodyId={styles.tbody}
              thead={
                <tr>
                  <th />
                  <th>{state.enums.NAME}</th>
                  <th>{state.enums.PAYMENTS_AMOUNT}</th>
                  <th>{state.enums.ICON}</th>
                  <th />
                </tr>
              }
              tbody={
                <>
                  {adminState.ptypes.map(ptype => (
                    <PtypeRow
                      ptype={ptype}
                      key={ptype._id}
                      deletePtypeHandler={() => deletePtypeHandler(ptype)}
                      editPaymentHandler={() => updatePtypeHandler(ptype)}
                      selectIconHandler={() => updatePtypeIconHandler(ptype)}
                    />
                  ))}
                </>
              }
            />
            <br />
            <form className={classNames(styles.add_new_ptype_form, styles.responsive_wrapper)}>
              <div>
                <label htmlFor="paymentTypeInput">{state.enums.ADD_NEW_PAYMENT_TYPE}:</label>
                <TextInput
                  placeholder={state.enums.INPUT_NAME}
                  id="paymentTypeInput"
                  onChangeHandler={v => {
                    if (!verifyPtypeName(v)) return
                    setPtypeName(v)
                  }}
                  value={ptypeName}
                />
              </div>
              <Button onClick={createPtype} disabled={!ptypeName}>
                {state.enums.ADD_BUTTON}
              </Button>
            </form>
            <br />
            <YesCancelModal
              yesClickHandler={deleteOneUser}
              noClickHandler={() => setIsUserDeleteModalOpened(false)}
              title={state.enums.CONFIRM_DELETE_USER}
              setIsModalOpened={setIsUserDeleteModalOpened}
              isModalOpened={isUserDeleteModalOpened}
            />
            <EditUserForm
              isEditModalOpened={isUserUpdateModalOpened}
              setIsEditModalOpened={setIsUserUpdateModalOpened}
              editedUser={updatedUser}
              setEditedUser={setUpdatedUser}
              confirmEdit={updateUser}
            />
            <h4>{state.enums.USERS}</h4>
            <Table
              thead={
                <tr>
                  <th>{state.enums.USERNAME}</th>
                  <th>{state.enums.ROLE}</th>
                  <th />
                </tr>
              }
              tbody={
                <>
                  {adminState.users.map(user => (
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
            <form className={classNames(styles.add_new_ptype_form, styles.responsive_wrapper)}>
              <div>
                <label htmlFor="username">{state.enums.ADD_NEW_USER}:</label>
                <TextInput
                  placeholder={state.enums.INPUT_USERNAME}
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
                  placeholder={state.enums.INPUT_PASSWORD}
                  id="password"
                  onChangeHandler={password => {
                    if (!verifyPassword(password)) return
                    setUserForm({ ...userForm, password })
                  }}
                  value={userForm.password}
                />
              </div>
              <Button onClick={createUser} disabled={!userForm.password?.trim() || !userForm.username?.trim()}>
                {state.enums.ADD_BUTTON}
              </Button>
            </form>
            <br />
          </>
        ) : (
          <AppLoader />
        )}
      </Layout>
    </AdminContext.Provider>
  )
}

export default Admin
