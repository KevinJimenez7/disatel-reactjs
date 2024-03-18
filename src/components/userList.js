import { List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Slide } from "@mui/material";
import useUsers from "../hooks/useUsers";
import { Add, Person } from "@mui/icons-material";

export default function Users(){

    const {open, users, openUser} = useUsers()

    return(
        <Slide style={{zIndex: 40}} in = {open} direction="right" mountOnEnter unmountOnExit>
            <List>
                {users.map((user, index) => (
                    <ListItemButton key={index} onClick={() => openUser(user.userId, user)}>
                        <ListItemIcon>
                            <Person/>
                        </ListItemIcon>
                        <ListItemText primary = {`${user.firstName} ${user.lastName}`} secondary = {user.email}/>
                    </ListItemButton>
                ))}
                <ListItemButton sx={{background: '#CBF897'}} onClick={() => openUser(0)}>
                    <ListItemIcon>
                        <Add/>
                    </ListItemIcon>
                    <ListItemText primary = "Agregar usuario"/>
                </ListItemButton>
            </List>
        </Slide>
    )
}