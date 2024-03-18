import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import LoginView from "../views/login/login.view";
import Dashboard from "../views/dashboard/dashboard.view";

export default function AppRouter (){

    const {isLoggedIn} = useSelector(state => state.auth)

    return (
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Dashboard/>} condition={isLoggedIn} redirect="/login"/>} />
          <Route path="/login" element={<ProtectedRoute element={<LoginView/>} condition={!isLoggedIn} redirect="/"/>} />
          <Route path="/*" element={<h1>Page Not Found 404</h1>} />
        </Routes>
    );
}