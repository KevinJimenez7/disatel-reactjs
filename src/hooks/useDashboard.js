import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setModalError, setOpenModalFolder } from "../redux/slices/generalSlice";
import { apiActiveFolder, apiCreateCredential, apiCreateFolder, apiDeleteCredential, apiGetFolders, apiUpadteCredential } from "../actions/dashboard.actions";
import { resetFormCredential, setEditFormCredential, setFolders, setFormCredential, setSelectedCredential, setSelectedFolder, setVisibleFolders } from "../redux/slices/foldersSlice";
import { resetFormUser, setOpenUsers, setUserSelected } from "../redux/slices/usersSlice";
import { setAuthToken, setIsAuthenticated, setLogOut, setUserData } from "../redux/slices/authSlice";

export default function useDashboard (){

    const {token} = useSelector((state) => state.auth)
    const {modalFolder} = useSelector((state) => state.general)
    const {selectedFolder, credentialForm, credentialSelected, visibleFolders} = useSelector((state) => state.folders)

    const [formFolder, setFormFolder] = useState({
        name: ''
    })

    const dispatch = useDispatch()

    useEffect(() => {

        if(token){
            dispatch(setVisibleFolders(true))
            getAllCredentials(token)
        }

    }, [])

    const getAllCredentials = async(token) => {
        try {
            dispatch(setIsLoading(true))

            await apiGetFolders(token)
            .then(res => {
                dispatch(setFolders(res.data.data.folders))
            })
            .catch(err => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción'
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

    const onChangeFormForlder = (e) => {
        setFormFolder({name: e.target.value})
    }

    const createNewFolder = async(e) => {
        e.preventDefault()

        dispatch(setIsLoading(true))
        try {
            await apiCreateFolder(token, formFolder)
            .then((res) => {
                if(res.status === 200){
                    return getAllCredentials(token)
                    .then(() => {
                        openCloseModalFolder(false)
                    })
                }
            })
            .catch((err) => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción'
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

    const openCloseModalFolder = (open) => {
        dispatch(setOpenModalFolder(open))
    }

    const openFolder = (id) => {
        dispatch(setOpenUsers(false))
        dispatch(resetFormUser())
        dispatch(setUserSelected(null))
        dispatch(setSelectedFolder(null))
        dispatch(resetFormCredential())
        dispatch(setSelectedCredential(null))
        if(id === selectedFolder) return
        setTimeout(() => {
            dispatch(setSelectedFolder(id))
        }, 200)
    }

    const openUsers = (open) => {
        dispatch(setSelectedFolder(null))
        dispatch(resetFormCredential())
        dispatch(setSelectedCredential(null))
        dispatch(setOpenUsers(false))
        dispatch(resetFormUser())
        dispatch(setUserSelected(null))
        if(!open) return
        setTimeout(() => {
            dispatch(setOpenUsers(true))
        }, 200)
    }

    const openCredential = (id, credentialData) => {
        if(credentialData){
            dispatch(setEditFormCredential({
                name: credentialData.name,
                username: credentialData.username,
                password: credentialData.password,
                url: credentialData.url
            }))
        } else {
            dispatch(resetFormCredential())
        }

        dispatch(setSelectedCredential(id))
    }

    const onChangeFormCredential = (e) => {
        dispatch(setFormCredential({
            name: e.target.name,
            value: e.target.value
        }))
    }

    const createCredential = async(e) => {
        e.preventDefault()

        try {
            dispatch(setIsLoading(true))

            await apiCreateCredential(token ,{...credentialForm, folderId: selectedFolder})
            .then((res) => {
                if(res.status === 200){
                    dispatch(resetFormCredential())
                    openCredential(null)
                    getAllCredentials(token)
                }
            })
            .catch((err) => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción'
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

    const updateCredential = async(e) => {
        e.preventDefault()

        try {
            dispatch(setIsLoading(true))

            await apiUpadteCredential(token ,{...credentialForm, folderId: selectedFolder, id: credentialSelected})
            .then((res) => {
                if(res.status === 200){
                    dispatch(resetFormCredential())
                    openCredential(null)
                    getAllCredentials(token)
                }
            })
            .catch((err) => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción'
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

    const deleteCredential = async() => {
        try {
            dispatch(setIsLoading(true))

            await apiDeleteCredential(token ,{folderId: selectedFolder, id: credentialSelected})
            .then((res) => {
                if(res.status === 200){
                    dispatch(resetFormCredential())
                    openCredential(null)
                    getAllCredentials(token)
                }
            })
            .catch((err) => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción'
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

    const activeFolder = async(active) => {
        try {
            dispatch(setIsLoading(true))

            await apiActiveFolder(token ,{id: selectedFolder, active: active})
            .then((res) => {
                if(res.status === 200){
                    dispatch(resetFormCredential())
                    openCredential(null)
                    getAllCredentials(token)
                }
            })
            .catch((err) => {
                dispatch(setModalError({
                    open: true,
                    title: 'Ocurrió un error',
                    message: 'No se pudo completar la acción'
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

    const logOut = () => {
        openCredential(null)
        dispatch(resetFormCredential())
        dispatch(resetFormUser())
        openFolder(null)
        dispatch(setUserSelected(null))
        dispatch(setVisibleFolders(false))

        setTimeout(() => {
            dispatch(setAuthToken(null))
            dispatch(setIsAuthenticated(false))
            dispatch(setUserData(null))
        }, 500)

    }

    return {
        getAllCredentials,
        visibleFolders,
        formFolder,
        onChangeFormForlder,
        createNewFolder,
        openCloseModalFolder,
        modalFolder,
        openFolder,
        openCredential,
        onChangeFormCredential,
        credentialForm,
        createCredential,
        updateCredential,
        deleteCredential,
        activeFolder,
        openUsers,
        logOut
    }
}