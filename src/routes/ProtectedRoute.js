import { Navigate } from "react-router-dom"

export default function ProtectedRoute ({condition, element, redirect = '/login'}){
    if(condition){
        return element
    }

    return <Navigate to={redirect}/>
}