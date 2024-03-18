import { useSelector } from "react-redux";
import useUsers from "../hooks/useUsers";
import { Button, IconButton, Slide, TextField, Tooltip } from "@mui/material";
import { AddCircle, Cancel, CheckCircle, LockReset, ManageAccounts, PersonOff } from "@mui/icons-material";

export default function UserDetail(){
    const {userSelected, users} = useSelector(state => state.users)
    const {openUser, formUser, onChangeFormUser, createUser, updateUser, activateUser, resetUserPassword} = useUsers()

    let activeUser = users.find(user => user.userId === userSelected)?.active

    return(
        <Slide direction="left" in = {userSelected !== null} mountOnEnter unmountOnExit>
            <div className="credential-container">
                <h2>Información del Usuario</h2>
                <form onSubmit={userSelected !== 0 ? updateUser : createUser}>
                    <TextField disabled = {!activeUser && userSelected !== 0} fullWidth value={formUser.firstName} onChange={onChangeFormUser} autoComplete="off" label = 'Nombre' name="firstName"/>
                    <TextField disabled = {!activeUser && userSelected !== 0} fullWidth value={formUser.lastName} onChange={onChangeFormUser} autoComplete="off" label = 'Apellido' name="lastName"/>
                    <TextField disabled = {!activeUser && userSelected !== 0} fullWidth value={formUser.email} onChange={onChangeFormUser} autoComplete="off" label = 'Correo electrónico' name="email"/>
                    <TextField disabled = {!activeUser && userSelected !== 0} fullWidth value={formUser.phone} onChange={onChangeFormUser} autoComplete="off" label = 'Teléfono' name="phone"/>
                    <div>
                        <Tooltip title = 'Cancelar'>
                            <IconButton onClick={() => openUser(null)}>
                                <Cancel/>
                            </IconButton>
                        </Tooltip>
                        {userSelected !== 0 &&
                            <>
                                <Tooltip title={`${activeUser ? 'Desactivar' : 'Activar'}`}>
                                    <IconButton onClick={activateUser}>
                                        {activeUser ?
                                            <PersonOff/>
                                            :
                                            <ManageAccounts/>
                                        }
                                    </IconButton>
                                </Tooltip>
                                {activeUser &&
                                <Tooltip title='Reiniciar constraseña'>
                                    <IconButton onClick={resetUserPassword}>
                                        <LockReset/>
                                    </IconButton>
                                </Tooltip>}
                            </>
                        }
                            {(activeUser) &&
                                <Tooltip title = 'Guardar cambios'>
                                    <IconButton type="submit">
                                        <CheckCircle/>
                                    </IconButton>
                                </Tooltip>
                            }

                            {userSelected === 0 &&
                                <Tooltip title = 'Agregar usuario'>
                                    <IconButton type="submit">
                                        <AddCircle/>
                                    </IconButton>
                                </Tooltip>
                            }
                    </div>
                </form>
            </div>
        </Slide>
    )
}