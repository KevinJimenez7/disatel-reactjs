import { useDispatch, useSelector } from "react-redux"
import { resetFormUser, setFormEditUser, setFormUser, setUserSelected, setUsers } from "../redux/slices/usersSlice"
import { setIsLoading, setModalError, setModalMessage } from "../redux/slices/generalSlice"
import { apiActivateUser, apiCreateUser, apiGetUsers, apiResetPasswordUser, apiUpdateUser } from "../actions/users.actions"
import { useEffect } from "react"

export default function useUsers(){

    const dispatch = useDispatch()

    const {open, formUser, users, userSelected} = useSelector(state => state.users)
    const {token, userData} = useSelector(state => state.auth)

    const onChangeFormUser = (e) => {
        const {name, value} = e.target

        dispatch(setFormUser({
            name : name,
            value : value
        }))
    }

    const getAllUsers = async() => {
        try {
            dispatch(setIsLoading(true))

            await apiGetUsers(token)
            .then((res) => {
                dispatch(setUsers(res.data.data.users))
            })
            .catch((err) => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción, intenta nuevamente'
                }))
            })

        } catch (error) {
            dispatch(setModalError({
                open: true,
                title: 'Ocurrió un error',
                message: 'No se pudo completar la acción, intenta nuevamente'
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    const openUser = (id, userData) => {
        if(userData){
            dispatch(setFormEditUser({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone
            }))
        } else {
            dispatch(resetFormUser())
        }

        dispatch(setUserSelected(id))
    }

    const createUser = async(e) => {
        e.preventDefault()

        try {
            dispatch(setIsLoading(true))

            await apiCreateUser(token , formUser)
            .then((res) => {
                if(res.status === 200){
                    dispatch(setModalMessage({
                        open: true,
                        title: 'Usuario creado correctamente',
                        message: `Nombre de usuario: ${res.data?.data?.username}, Constraseña temporal: ${res.data?.data?.temporalPassword}`
                    }))
                    dispatch(resetFormUser())
                    openUser(null)
                    getAllUsers(token)
                }
            })
            .catch((err) => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción, intenta nuevamente'
                }))
            })

        } catch (error) {
            dispatch(setModalError({
                open: true,
                title: 'Ocurrió un error',
                message: 'No se pudo completar la acción, intenta nuevamente'
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    const updateUser = async(e) => {
        e.preventDefault()

        try {
            dispatch(setIsLoading(true))

            await apiUpdateUser(token ,{...formUser, id: userSelected})
            .then((res) => {
                if(res.status === 200){
                    dispatch(resetFormUser())
                    openUser(null)
                    getAllUsers()
                }
            })
            .catch((err) => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción, intenta nuevamente'
                }))
            })

        } catch (error) {
            dispatch(setModalError({
                open: true,
                title: 'Ocurrió un error',
                message: 'No se pudo completar la acción, intenta nuevamente'
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    const activateUser = async() => {
        try {
            dispatch(setIsLoading(true))

            await apiActivateUser(token, {id: userSelected})
            .then(res => {
                if(res.status === 200){
                    getAllUsers()
                }
            })
            .catch(err => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción, intenta nuevamente'
                }))
            })

        } catch (error) {
            dispatch(setModalError({
                open: true,
                title: 'Ocurrió un error',
                message: 'No se pudo completar la acción, intenta nuevamente'
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    const resetUserPassword = async() => {
        try {
            dispatch(setIsLoading(true))

            await apiResetPasswordUser(token, {id: userSelected})
            .then(res => {
                if(res.status === 200){
                    dispatch(resetFormUser())
                    openUser(null)
                    getAllUsers()

                    dispatch(setModalMessage({
                        open: true,
                        title: 'Contraseña reiniciada correctamente',
                        message: `Nueva contraseña temporal: ${res.data?.data?.temporalPassword}`
                    }))
                }
            })
            .catch(err => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción, intenta nuevamente'
                }))
            })

        } catch (error) {
            
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    useEffect(() => {
        if(userData.rol === 'ADMIN'){
            getAllUsers()
        }
    }, [])

    return{
        open,
        onChangeFormUser,
        formUser,
        getAllUsers,
        users,
        openUser,
        createUser,
        updateUser,
        activateUser,
        resetUserPassword
    }
}