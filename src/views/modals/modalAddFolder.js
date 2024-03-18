import { Button, Modal, TextField } from "@mui/material";

export default function ModalFolder({open, formFolder, onChangeFormFolder, createNewFolder, openCloseModalFolder}){
    return(
        <Modal open = {open}>
            <main className="modal-container">
                <div className="modal-content">
                    <h2>Agregar Carpeta</h2>
                    <section>
                        <form onSubmit={createNewFolder}>
                            <TextField value={formFolder.name} onChange={onChangeFormFolder} label = "Nombre de la carpeta" variant="outlined"/>
                            <div className="button-group">
                                <Button onClick={() => openCloseModalFolder(false)} color="error" variant="contained">Cancelar</Button>
                                <Button type="submit" color="success" variant="contained">Agregar</Button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>
        </Modal>
    )
}