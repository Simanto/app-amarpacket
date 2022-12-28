import { Row, Col } from "reactstrap"
import { useAppContext } from "../../context/appContext"
import { Loading } from "../../elements";
import { FormEditMerchant } from "../../modules"

const AdminMerchantEdit = () =>{
    const {
        isLoading,
        merchant_bank_name,
        merchant_branch_name,
        merchant_account_holder_name,
        merchant_account_number,
        merchant_bikash_number,
        merchant_nagad_number,
    } = useAppContext();
    return(
        <>
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>Edit Merchant</h4>
                </div>
            </div>
            {/* End */}

            {/* Body */}
            <div className="mx-4">
                <Row>
                    <Col md="7">
                        {isLoading ?
                            <Loading /> 
                            :
                            <FormEditMerchant />
                        }
                    </Col>
                    <Col md="5" className="px-5">
                        <div className="section-heading pb-3">
                            <h5>Payment Methods</h5>
                        </div>
                        <p><span className="fw-medium text-uppercase text-dark mb-0">Bank:</span></p>
                        {merchant_bank_name ? 
                            <>
                                <p className="mb-1"><span className="fw-medium me-2">Bank Name:</span>{merchant_bank_name}</p>
                                <p className="mb-1"><span className="fw-medium me-2">Branch Name:</span>{merchant_branch_name}</p>
                                <p className="mb-1"><span className="fw-medium me-2">Account Holder Name:</span>{merchant_account_holder_name}</p>
                                <p className="mb-4"><span className="fw-medium me-2">Account Number:</span>{merchant_account_number}</p>
                            </>
                            : 
                            <p className="me-2">No bank account added yet.</p>
                        }
                        <p><span className="fw-medium text-uppercase text-dark mb-0">MFS:</span></p>
                        {merchant_bikash_number ? 
                            <p><span className="fw-medium me-2">Bikash:</span>{merchant_bikash_number}</p> 
                            : 
                            <p>No Bkash account.</p>
                        }
                        {merchant_nagad_number ? 
                            <p><span className="fw-medium me-2">Nagad:</span>{merchant_nagad_number}</p> 
                            : 
                            <p>No nagad account.</p>
                        }
                    </Col>
                </Row>
            </div>
            {/* End */}
        </>
    )
}

export default AdminMerchantEdit