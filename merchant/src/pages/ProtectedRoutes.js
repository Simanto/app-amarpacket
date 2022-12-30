import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext.js"

const ProtectedRoutes = ({children}) => {
    const {user} = useAppContext();
    

    if(user.length < 1){
        return <Navigate to={"/"} />
    } else {
        return children
    }
}

export default ProtectedRoutes