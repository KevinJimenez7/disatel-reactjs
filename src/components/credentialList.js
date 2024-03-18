import { Add, FolderOff, Key, Password } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slide } from "@mui/material";
import { useSelector } from "react-redux";
import useDashboard from "../hooks/useDashboard";

export default function Credentials (){

    const {folders, selectedFolder} = useSelector((state) => state.folders)
    const {openCredential, activeFolder} = useDashboard()

    return(
        <>
        {folders.map((folder, index) => (
        <Slide style={{zIndex: 40}} key={index} in = {folder.folderId === selectedFolder} direction="right" mountOnEnter unmountOnExit>
            
            <List>      
                {folder.passwords.map((credential, index) => (
                    <ListItemButton disabled = {!folder.active} key={index} onClick={() => openCredential(credential.passwordId, credential)}>
                        <ListItemIcon>
                            <Key/>
                        </ListItemIcon>
                        <ListItemText primary = {credential.name} secondary = {credential.username}/>
                    </ListItemButton>
                ))}
                <ListItemButton sx={{background: '#CBF897'}} onClick={() => openCredential(0)}>
                    <ListItemIcon>
                        <Add/>
                    </ListItemIcon>
                    <ListItemText primary = "Agregar credencial"/>
                </ListItemButton>
                <ListItemButton sx={{background: '#FFDE59'}} onClick={() => activeFolder(!folder.active)}>
                    <ListItemIcon>
                        <FolderOff/>
                    </ListItemIcon>
                    <ListItemText primary = {`${folder.active ? 'Desactivar' : 'Activar'} carpeta`}/>
                </ListItemButton>
            </List>
        </Slide>
        ))}
        </>
    )
}