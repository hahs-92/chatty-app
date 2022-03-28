import { Outlet, Navigate } from "react-router-dom"


export const PrivateRoutes = ({isAuth}) => {
    console.log("private: ", isAuth)
    return isAuth ? <Outlet /> :  <Navigate to="login" replace/>
}

