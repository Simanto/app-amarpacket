import { Col, Row } from "reactstrap"
import { useAppContext } from "../../context/appContext"
import { FormUserAdd } from "../../modules"

const AdminUserAdd = () =>{
    const {isEditing, user_fullname} = useAppContext();
    return(
        <>
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4> 
                        {isEditing && user_fullname ?
                            <span>Edit </span> 
                            :
                            <span>Add </span>
                        }
                        User
                    </h4>
                </div>
            </div>
            {/* End */}

            {/* Body */}
            <Col md="7" className="mx-4">
                <FormUserAdd />
            </Col>
            {/* End */}
        </>
    )
}

export default AdminUserAdd