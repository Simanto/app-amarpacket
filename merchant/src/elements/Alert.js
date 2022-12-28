import { Fade } from "reactstrap"
import { useAppContext } from "../context/appContext"

const Alert = () =>{
    const {alertType,alertText} = useAppContext()

    return (
        <Fade >
            <div className={`mb-0 alert alert-${alertType}`}>
                {alertText}
            </div>
        </Fade>
        
    )
}

export default Alert