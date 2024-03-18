import { Button, IconButton, Slide, TextField, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import useDashboard from "../hooks/useDashboard";
import { AddCircle, Cancel, CheckCircle, ContentCopy, Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { copyToClipboard } from "../utils/doc.utils";

export default function Credential(){
    const {credentialSelected} = useSelector((state) => state.folders)
    const {openCredential, credentialForm, onChangeFormCredential, createCredential, updateCredential, deleteCredential} = useDashboard()
    const [showPassword, setShowPassword] = useState(false)

    const InputButtons = ({value, password = false}) => {
        return(
            <>
                {password &&
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ?
                            <Visibility/> : <VisibilityOff/>
                        }
                    </IconButton>
                }
                <IconButton onClick={() => copyToClipboard(value)}>
                    <ContentCopy/>
                </IconButton>
            </>
        )
    }

    return(
        <Slide direction="left" in = {credentialSelected !== null} mountOnEnter unmountOnExit>
            <div className="credential-container">
                <h2>Información del Elemento</h2>
                <form onSubmit={credentialSelected !== 0 ? updateCredential : createCredential}>
                    <TextField fullWidth value={credentialForm.name} onChange={onChangeFormCredential} autoComplete="off" label = 'Nombre' name="name"/>
                    <TextField fullWidth value={credentialForm.username} onChange={onChangeFormCredential} autoComplete="off" label = 'Nombre de Usuario' name="username"
                        InputProps={{
                            endAdornment: <InputButtons value={credentialForm.username}/>
                        }}
                    />
                    <TextField fullWidth value={credentialForm.password} onChange={onChangeFormCredential} autoComplete="off" label = 'Contraseña' name="password" type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: <InputButtons value={credentialForm.password} password/>
                        }}
                    />
                    <TextField fullWidth value={credentialForm.url} onChange={onChangeFormCredential} autoComplete="off" label = 'URL' name="url"
                        InputProps={{
                            endAdornment: <InputButtons value={credentialForm.url}/>
                        }}
                    />
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