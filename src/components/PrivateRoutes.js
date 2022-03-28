import { Outlet, Navigate } from "react-router-dom"


export const PrivateRoutes = ({isAuth}) => {
    return isAuth ? <Outlet /> :  <Navigate to="signIn" replace/>
}

