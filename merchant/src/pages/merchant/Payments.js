import { useEffect } from "react";
import { useAppContext } from "../../context/appContext"
import { TableMerchantAllPayment } from "../../modules"

const Payments = () =>{
    const {merchantGetAllInvoice} = useAppContext();
    useEffect(() => {
        merchantGetAllInvoice();
    }, [])
    
    return(
        <>
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>All Payments</h4>
                </div>
            </div>
            {/* End */}

            {/* Body */}
            <div className="card mx-4 py-4">
                <TableMerchantAllPayment />
            </div>
            {/* End */}
        </>
    )
}

export default Payments