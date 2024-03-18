import { Button, IconButton, Slide, TextField, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import useDashboard from "../hooks/useDashboard";
import { AddCircle, Cancel, CheckCircle, Delete } from "@mui/icons-material";

export default function Credential(){
    const {credentialSelected} = useSelector((state) => state.folders)
    const {openCredential, credentialForm, onChangeFormCredential, createCredential, updateCredential, deleteCredential} = useDashboard()

    return(
        <Slide direction="left" in = {credentialSelected !== null} mountOnEnter unmountOnExit>
            <div className="credential-container">
                <h2>Información del Elemento</h2>
                <form onSubmit={credentialSelected !== 0 ? updateCredential : createCredential}>
                    <TextField fullWidth value={credentialForm.name} onChange={onChangeFormCredential} autoComplete="off" label = 'Nombre' name="name"/>
                    <TextField fullWidth value={credentialForm.username} onChange={onChangeFormCredential} autoComplete="off" label = 'Nombre de Usuario' name="username"/>
                    <TextField fullWidth value={credentialForm.password} onChange={onChangeFormCredential} autoComplete="off" label = 'Contraseña' name="password" type="password"/>
                    <TextField fullWidth value={credentialForm.url} onChange={onChangeFormCredential} autoComplete="off" label = 'URL' name="url"/>
                    <div>
                        <Tooltip title = 'Cancelar'>
                            <IconButton onClick={() => openCredential(null)}>
                                <Cancel/>
                            </IconButton>
                        </Tooltip>
                        {credentialSelected !== 0 &&
                            <Tooltip title = 'Eliminar'>
                                <IconButton onClick={deleteCredential}>
                                    <Delete/>
                                </IconButton>
                            </Tooltip>
                        }
                        {credentialSelected !== 0 ?
                        <Tooltip title = 'Guardar'>
                            <IconButton type="submit">
                                <CheckCircle/>
                            </IconButton>
                        </Tooltip>
                            :
                        <Tooltip title = 'Agregar'>
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