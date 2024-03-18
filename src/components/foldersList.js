import { Add, ExpandLess, ExpandMore, Folder, FolderOffOutlined, FolderOpen, Logout, Person } from "@mui/icons-material";
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDashboard from "../hooks/useDashboard";

const data = [
    {name: 'test'}
]

export default function Folders (){

    const [openFolders, setOpenFolders] = useState(false)
    const {folders, selectedFolder} = useSelector((state) => state.folders)
    const {open: usersOpen} = useSelector((state) => state.users)
    const {userData} = useSelector((state) => state.auth)
    const {openCloseModalFolder, openFolder, openUsers, logOut} = useDashboard()

    return (
            <>
            <List style={{height: '100%'}}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpenFolders(!openFolders)}>
                    <ListItemIcon>
                    {openFolders ? <ExpandLess style={{color: "white"}}/> : <ExpandMore style={{color: "white"}}/>}
                    </ListItemIcon>
                    <ListItemText primary = "CARPETAS"/>
                    </ListItemButton>
                    <Tooltip title = "Agregar carpeta">
                        <IconButton onClick={() => openCloseModalFolder(true)}>
                            <Add style={{color: "white"}}/>
                        </IconButton>
                    </Tooltip>
                </ListItem>
                <Collapse in = {openFolders} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            folders?.length > 0 ?
                                folders?.map((folder, index) => (
                                    <ListItem disablePadding>
                                    <ListItemButton selected = {folder.folderId === selectedFolder} onClick={() => openFolder(folder?.folderId)} key={index}>
                                        <ListItemIcon>
                                            {folder.active ? 
                                            <FolderOpen/>
                                            :
                                            <FolderOffOutlined/>
                                            }
                                        </ListItemIcon>
                                        <ListItemText primary = {folder?.name}/>
                                    </ListItemButton>
                                    </ListItem>
                                ))
                                :
                                <ListItem>
                                    <ListItemText secondary = "No tienes carpetas agregadas"/>
                                </ListItem>
                        }
                    </List>
                </Collapse>
                {userData?.rol === "ADMIN" && 
                    <ListItemButton onClick={() => openUsers(!usersOpen)}>
                        <ListItemIcon>
                            <Person style={{color: "white"}}/>
                        </ListItemIcon>
                        <ListItemText primary = "USUARIOS"/>
                    </ListItemButton>
                }
            </List>
            <ListItem>
                <ListItemButton onClick={logOut}>
                <ListItemIcon>
                    <Logout style={{color: "white"}}/>
                </ListItemIcon>
                <ListItemText primary = "Cerrar Sesión"/>
                </ListItemButton>
            </ListItem>
            </>
    )
}