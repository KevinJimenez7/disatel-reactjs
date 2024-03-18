import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function LoadingScreen (){

    const {loading} = useSelector((state => state.general))

    return (
        <Backdrop
            open = {loading}
            sx={{zIndex: 999, color: 'red'}}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
}