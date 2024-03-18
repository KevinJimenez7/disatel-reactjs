import { Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDashboard from "../../hooks/useDashboard";
import { setIsLoading, setModalError, setModalMessage } from "../../redux/slices/generalSlice";
import * as http from '../../api/http'

export default function ModalPassword(){

    const dispatch = useDispatch()
    const {logOut} = useDashboard()
    const {userData, token} = useSelector((state) => state.auth)
    const [form, setForm] = useState({
        pass1: '',
        pass2: ''
    })

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const changePassword = async(e) => {
        e.preventDefault()

        if(form.pass1 !== form.pass2){
            return dispatch(setModalError({
                open: true,
                title: 'Error',
                message: 'Las contraseñas no coinciden'
            }))
        }
        try {
            dispatch(setIsLoading(true))
            await http.post('/user/changePassword', token, {password: form.pass1})
            .then(res => {
                if(res.status === 200){
                    dispatch(setModalMessage({
                        open: true,
                        message: 'Çontraseña actualizada correctamente, inicia sesión de nuevo',
                        title: 'Contraseña actualizada'
                    }))
                    logOut()
                }
            })
            .catch((err) => {
                dispatch(setModalError({
                    open: true,
                    title: 'Error',
                    message: 'Ocurrió un error al actualizar la constraseña, intenta nuevamente'
                }))                
            })
        } catch (error) {
            dispatch(setModalError({
                open: true,
                title: 'Error',
                message: 'Ocurrió un error al actualizar la constraseña, intenta nuevamente'
            }))
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    let reset = userData.resetPassword ?? false 
    
    return(
        <Modal open = {reset}>
            <main className="modal-container">
                <div className="modal-content">
                    <h2>Nueva contraseña</h2>
                    <section>
                        <form onSubmit={changePassword}>
                            <TextField value={form.pass1} onChange={onChange} label = "Nueva contraseña" type="password" variant="outlined" name="pass1"/>
                            <TextField value={form.pass2} onChange={onChange} label = "Confirmar contraseña" type="password" variant="outlined" name="pass2"/>
                            <div className="button-group">
                                <Button onClick={logOut} color="error" variant="contained">Cerrar Sesión</Button>
                                <Button type="submit" color="success" variant="contained">Cambiar contraseña</Button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>
        </Modal>
    )
}