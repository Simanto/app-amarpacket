import { useEffect } from "react";
import { Button } from "reactstrap"
import { useAppContext } from "../../context/appContext"
import { Alert } from "../../elements";
import { TableAdminAllInvoices } from "../../modules";

const AdminPayments = () =>{
    const {adminGetAllInvoice,adminCreateInvoice,showAlert} = useAppContext();

    const handleClick = () =>{
        adminCreateInvoice();
    }
    useEffect(() => {
        adminGetAllInvoice();
    }, [])
    
    return(
        <>
            {/* Error */}
            {showAlert && 
                <div className="app-header d-flex flex-row p-4">
                    <Alert />
                </div>
            }
            {/* Error: end */}
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>All Invoices</h4>
                </div>
                <div className='app-header_date d-flex justify-content-center align-items-center'>
                    <Button color='primary text-uppercase fw-medium mb-2' onClick={handleClick}> Generate Invoices</Button>
                </div>
            </div>
            {/* End */}

            {/* Body */}
            <div className="card mx-4">
                <TableAdminAllInvoices />
            </div>
            {/* End */}
        </>
    )
}

export default AdminPayments