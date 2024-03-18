import { ListItem, ListItemButton, ListItemIcon, ListItemText, Slide } from '@mui/material'
import Folders from '../../components/foldersList'
import useDashboard from '../../hooks/useDashboard'
import './dashboard.style.css'
import '../modals/modals.style.css'
import ModalFolder from '../modals/modalAddFolder'
import Credentials from '../../components/credentialList'
import Credential from '../../components/credentialDetail'
import Users from '../../components/userList'
import UserDetail from '../../components/userDetail'

export default function Dashboard (){

    const {
        visibleFolders,
        formFolder,
        onChangeFormForlder,
        openCloseModalFolder,
        createNewFolder,
        modalFolder
    } = useDashboard()

    return (
        <main className="dashboard-container">
            <ModalFolder open={modalFolder} formFolder={formFolder} onChangeFormFolder={onChangeFormForlder} openCloseModalFolder={openCloseModalFolder} createNewFolder={createNewFolder}/>
            <Slide style={{zIndex: 50}} direction='right' in = {visibleFolders} mountOnEnter unmountOnExit>
                <section className="folders-container">
                    <h3>Prueba Técnica, Corporación Disatel SA</h3>
                    <hr/>
                    <Folders/>
                </section>
            </Slide>
            <section className="credentials-container">
                <Credentials/>
                <Users/>
            </section>
            <section className="credential-detail-container">
            <Credential/>
            <UserDetail/>
            </section>
        </main>
    )
}