import { TableAllMerchants } from "../../modules"

const AdminMerchants = () =>{
    return(
        <>
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>All Merchants</h4>
                </div>
            </div>
            {/* End */}

            {/* Body */}
            <div className="card mx-4">
                <TableAllMerchants />
            </div>
            {/* End */}
        </>
    )
}

export default AdminMerchants