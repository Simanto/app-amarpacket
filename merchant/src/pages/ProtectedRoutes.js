import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext.js"

const ProtectedRoutes = ({children}) => {
    const {token} = useAppContext();
    

    if(!token){
        return <Navigate to={"/login"} />
    } else {
        return children
    }
}

export default ProtectedRoutes