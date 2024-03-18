import { useEffect, useState } from "react"
import { apiLogin } from "../actions/login.actions"
import { useDispatch } from "react-redux"
import { setIsLoading } from "../redux/slices/generalSlice"
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
                        username: res.data?.data?.username
                    }))
                    // getAllCredentials(res.data?.data?.token)
                    
                    setTimeout(async() => {
                        dispatch(setIsAuthenticated(true))
                    }, 800)
                }
            })
            .catch(err => {
                console.log(err);
            })
            dispatch(setIsLoading(false))
        } catch (error) {
            console.log(error);
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