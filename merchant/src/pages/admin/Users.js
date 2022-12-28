import { Button } from "reactstrap"
import {TableAllUsers } from "../../modules"

const AdminUsers = () =>{
    return(
        <>
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>All Users</h4>
                </div>
                <div className='app-header_date d-flex justify-content-center align-items-center'>
                    <Button href='user/new' color='primary text-uppercase fw-medium mb-2'> Add User</Button>
                </div>
            </div>
            {/* End */}

            {/* Body */}
            <div className="card mx-4">
                <TableAllUsers />
            </div>
            {/* End */}
        </>
    )
}

export default AdminUsers