import { useEffect, useState } from "react"
import { apiLogin } from "../actions/login.actions"
import { useDispatch } from "react-redux"
import { setIsLoading, setModalError } from "../redux/slices/generalSlice"
import { setAuthToken, setIsAuthenticated, setUserData } from "../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import useDashboard from "./useDashboard"

export default function(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {getAllCredentials} = useDashboard()

    const [formVisible, setFormVisible] = useState(false)
    const [logoVisible, setLogoVisible] = useState(false)
    
    const [form, setForm] = useState({
        email : "",
        password: ""
    })

    useEffect(() => {
        setLogoVisible(true)
        setTimeout(() => {
            setFormVisible(true)
        }, 600)
    }, [])

    const onChangeForm = (e) => {
        const {value, name} = e.target

        setForm({
            ...form,
            [name] : value
        })
    }

    const onSubmit = async(e) => {
        e.preventDefault()

        dispatch(setIsLoading(true))
        try {
            await apiLogin(form)
            .then((res) => {
                if(res.data.status === 'Exitoso'){

                    dispatch(setAuthToken(res.data?.data?.token))
                    setFormVisible(false)
                    setLogoVisible(false)
                    dispatch(setUserData({
                        firstName: res.data?.data?.firstName,
                        lastName: res.data?.data?.lastName,
                        rol: res.data?.data?.rol,
                        username: res.data?.data?.username,
                        resetPassword: res.data?.data?.resetPassword
                    }))
                    
                    setTimeout(async() => {
                        dispatch(setIsAuthenticated(true))
                    }, 800)
                }
            })
            .catch(err => {
                dispatch(setModalError({
                    open: true,
                    title: err.response.data.message || 'Ocurrió un error',
                    message: err.response.data.error.description || 'No se pudo completar la acción, intenta nuevamente'
                }))
            })
            dispatch(setIsLoading(false))
        } catch (error) {
            dispatch(setModalError({
                open: true,
                title: 'Ocurrió un error',
                message: 'No se pudo completar la acción, intenta nuevamente'
            }))
            dispatch(setIsLoading(false))
        }
    }
    
    return {
        form,
        onChangeForm,
        onSubmit,

        logoVisible,
        formVisible
    }
}