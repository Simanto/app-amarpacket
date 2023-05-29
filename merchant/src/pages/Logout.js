import { useEffect } from "react";
import { useAppContext } from "../context/appContext"
import { Loading } from "../elements";

const Logout = () =>{
    const {logOut} = useAppContext();
    
    useEffect(() => {
      logOut();
    }, []);

    return <Loading />
}

export default Logout