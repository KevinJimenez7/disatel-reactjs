import { Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalError } from "../../redux/slices/generalSlice";

export default function ModalError(){

    const dispatch = useDispatch()
    const {modalError} = useSelector(state => state.general)
    const handleClose = () => {
        dispatch(setModalError({
            open: false,
            title: '',
            message: ''
        }))
    } 

    return(
        <Modal open = {modalError.open}>
            <main className="modal-container">
                <div className="modal-content">
                    <h3>{modalError.title}</h3>
                    <section>
                        <p>
                            {modalError.message}
                        </p>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </section>
                </div>
            </main>
        </Modal>
    )
}