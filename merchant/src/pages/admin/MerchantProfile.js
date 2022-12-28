import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "reactstrap"
import { useAppContext } from "../../context/appContext";
import Loading from "../../elements/Loading.js";

const AdminMerchantProfile = () =>{
    // App Context
    const{
        isLoading,
        singleMerchant,
        name,
    } = useAppContext();

    return(
        <>
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>Merchant Profile</h4>
                </div>
            </div>
            {/* End */}
            <div className="card mx-4 p-5">
                {isLoading ?
                    <Loading />
                    :
                    <>
                    <Row>
                        {/* Profile Information */}
                        <Col md="4" className="section-profile_info">
                            <div className="section-heading pb-3">
                                <h5>Profile Information</h5>
                            </div>
                            <p><span className="fw-medium me-2">Member Since:</span> <Moment format="DD MMM, YYYY " date={singleMerchant.createdAt} /></p>
                            <p><span className="fw-medium me-2">Owner Name:</span> {singleMerchant.merchant_name}</p>
                            <p><span className="fw-medium me-2">Business Name:</span> {singleMerchant.merchant_business_name}</p>
                            <p><span className="fw-medium me-2">Contact No.:</span> {singleMerchant.merchant_business_phone}</p>
                            <p><span className="fw-medium me-2">Vrified:</span> {singleMerchant.merchant_isVerified === true ? "Yes" : "No"}</p>
                            <p><span className="fw-medium me-2">Product Type:</span> {singleMerchant.merchant_product_type || "Not Selected"}</p>
                            <p><span className="fw-medium me-2">Base Charge:</span> {singleMerchant.merchant_base_charg || 60}</p>
                            <p><span className="fw-medium me-2">FB Page:</span> {singleMerchant.merchant_fb_page}</p>
                        </Col>
                        {/* End */}
                        {/* Pickup Location */}
                        <Col md="4" className="section-pickup_location">
                            <div className="section-heading pb-3">
                                <h5>Pickup Location</h5>
                            </div>
                            <p><span className="fw-medium me-2">Pickup Area:</span> <br />{singleMerchant.merchant_pickup_area || "Not Selected"}</p>
                            <p><span className="fw-medium me-2">Pickup Address:</span> <br />{singleMerchant.merchant_pickup_address || "Not Selected"}</p>
                        </Col>
                        {/* End */}
                        {/* Payment Methods */}
                        <Col md="4" className="section-pickup_location">
                            <div className="section-heading pb-3">
                                <h5>Payment Methods</h5>
                            </div>
                            <p><span className="fw-medium text-uppercase text-dark mb-0">Bank:</span></p>
                            {singleMerchant.merchant_bank_name ? 
                                <>
                                    <p className="mb-1"><span className="fw-medium me-2">Bank Name:</span>{singleMerchant.merchant_bank_name}</p>
                                    <p className="mb-1"><span className="fw-medium me-2">Branch Name:</span>{singleMerchant.merchant_branch_name}</p>
                                    <p className="mb-1"><span className="fw-medium me-2">Account Holder Name:</span>{singleMerchant.merchant_account_holder_name}</p>
                                    <p className="mb-4"><span className="fw-medium me-2">Account Number:</span>{singleMerchant.merchant_account_number}</p>
                                </>
                                : 
                                <p className="me-2">No bank account added yet.</p>
                            }
                            <p><span className="fw-medium text-uppercase text-dark mb-0">MFS:</span></p>
                            {singleMerchant.merchant_bikash_number ? 
                                <p><span className="fw-medium me-2">Bikash:</span>{singleMerchant.bikash_number}</p> 
                                : 
                                <p>No Bkash account.</p>
                            }
                            {singleMerchant.merchant_nagad_number ? 
                                <p><span className="fw-medium me-2">Nagad:</span>{singleMerchant.nagad_number}</p> 
                                : 
                                <p>No nagad account.</p>
                            }
                            
                        </Col>
                        {/* End */}
                    </Row>

                    </>
                }
            </div>
        </>
    )
}

export default AdminMerchantProfile