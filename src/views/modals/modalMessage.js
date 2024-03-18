import { Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalMessage } from "../../redux/slices/generalSlice";

export default function ModalMessage(){

    const dispatch = useDispatch()
    const {modalMessage} = useSelector(state => state.general)
    const handleClose = () => {
        dispatch(setModalMessage({
            open: false,
            title: '',
            message: ''
        }))
    } 

    return(
        <Modal open = {modalMessage.open}>
            <main className="modal-container">
                <div className="modal-content">
                    <h3>{modalMessage.title}</h3>
                    <section>
                        <p>
                            {modalMessage.message}
                        </p>
                        <Button variant="outlined" color="success" onClick={handleClose}>
                            Aceptar
                        </Button>
                    </section>
                </div>
            </main>
        </Modal>
    )
}