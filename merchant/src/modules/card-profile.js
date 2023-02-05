import { useEffect, useState } from "react"
import classnames from "classnames";
import { Col,Button, Modal, Nav, NavItem, NavLink, TabContent, TabPane, Card } from "reactstrap";
import { useAppContext } from "../context/appContext"
import FormAddBank from "./form-add_bank";
import FormAddMFS from "./form-add_mfs";
import FormMerchantProfile from "./form-edit_profile";
import FormPassword from "./form-merchant_password_change";
const CardProfile = () => {
    const {
        data,
        logOut,
        setAreaList,
        merchant_name,
        merchant_email,
        merchant_business_name,
        merchant_business_phone,
        merchant_base_charge,
        merchant_pickup_area,
        merchant_pickup_address,
        merchant_fb_page,
        merchant_bank_name,
        merchant_branch_name,
        merchant_account_holder_name,
        merchant_account_number,
        merchant_bikash_number,
        merchant_nagad_number,
    } = useAppContext();

    const {payment_bank, payment_bikash, payment_nagad} = data;

    const [modal, setModal] = useState(false);
    const [hasBank, setHasBank] = useState(false);
    const [hasMFS, setHasMFS] = useState(false);
    const [hasBikash, setHasBikash] = useState(false);
    const [hasNagad, setHasNagad] = useState(false);
    const [addBank, setAddBank] = useState(false);
    const [form, setForm] = useState(false);

    const handleClick = () =>{
        logOut();
    }

    const toggleModal = (data) => {
        setModal(!modal)
        setForm(data);
    };

    // State for current active Tab
    const [activeTab, setActiveTab] = useState("profile");
  
    // Toggle active state for Tab
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    
    useEffect(() => {
        setAreaList();
    }, [])

  return (
    <Card className="my-3">
        {/* Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between p-4">
            <div className="car-user_info">
                <h3> {merchant_name} </h3>
                <p> 
                    <span className="pe-3 border-end border-dark">
                        {merchant_business_name}
                    </span> 
                    <span className="ps-3">
                        {merchant_business_phone} 
                    </span>
                </p>
            </div>
            <div className="w-sm-100 align-self-center">
                <div className="btn btn-primary d-block btn-logout text-uppercase fw-medium" onClick={handleClick}>Logout</div>
            </div>
        </div>
        {/* End: header */}
        {/* TAB */}
        {/* Tab - Header */}
        <Nav tabs className="ps-4">
            <NavItem>
                <NavLink
                    className={classnames({
                        active:
                            activeTab === "profile"
                    })}
                    onClick={() => { toggle("profile"); }}
                >
                    Profile
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({
                        active:
                            activeTab === "payment_method"
                    })}
                    onClick={() => { toggle("payment_method"); }}
                >
                    Payment Method
                </NavLink>
            </NavItem>
        </Nav>
        {/* End: Tab - Header */}
        {/* TAB - Content */}
        <TabContent activeTab={activeTab}>
            <TabPane tabId="profile" className="p-4">
                <div className="card profile d-flex flex-column flex-sm-row align-items-start p-4 mb-3">
                    <div className="profile-info flex-grow-1">
                        <div className="d-flex justify-content-start pb-1">
                            <p className="text-dark w-25">Owner Name:</p>
                            <p className="ps-4">{merchant_name}</p>
                        </div>
                        <div className="d-flex justify-content-start pb-1">
                            <p className="text-dark pe-1 w-25">Business Name:</p>
                            <p className="ps-4 ">{merchant_business_name} </p>
                        </div>
                        <div className="d-flex justify-content-start pb-1">
                            <p className="text-dark pe-1 w-25">Email:</p>
                            <p className="ps-4">{merchant_email} </p>
                        </div>
                        <div className="d-flex justify-content-start pb-1">
                            <p className="text-dark pe-1 w-25">FB Page:</p>
                            <p className="ps-4">{merchant_fb_page} </p>
                        </div>
                        <div className="d-flex justify-content-start pb-1">
                            <p className="text-dark pe-1 w-25">Phone:</p>
                            <p className="ps-4">{merchant_business_phone} </p>
                        </div>
                        <div className="d-flex justify-content-start">
                            <p className="text-dark pe-1 w-25">Address:</p>
                            <p className="ps-4">{merchant_pickup_address} </p>
                        </div>
                    </div>
                    <Button color="primary" onClick={() => {toggleModal("profile")}}>Edit</Button>
                </div>

                {/* Password Change */}
                <div className="card d-flex justify-content-between p-4">
                    <Col className="w-70 me-4">
                        <h6 className="pb-0">Password</h6>
                        <p>If you want to change your password then click the button.</p>
                    </Col>
                    <Col>
                        <Button color="primary" onClick={() => {toggleModal("password")}}>Change Password</Button>
                    </Col>
                </div>
            </TabPane>
            <TabPane tabId="payment_method" className="p-4">
                {/* Bank Account */}
                <div className="card  p-4 mb-3">
                    <h6 className="pb-3">Bank Account</h6>
                    {merchant_bank_name ? 
                    <div className="payment_bank d-flex flex-row align-items-start">
                        <div className="profile-info flex-grow-1">
                            <div className="d-flex justify-content-start pb-1">
                                <p className="text-dark w-40">Bank Name:</p>
                                <p className="ps-4">{merchant_bank_name} </p>
                            </div>
                            <div className="d-flex justify-content-start pb-1">
                                <p className="text-dark w-40">Branch Name:</p>
                                <p className="ps-4">{merchant_branch_name} </p>
                            </div>
                            <div className="d-flex justify-content-start pb-1">
                                <p className="text-dark w-40">Account Holder Name:</p>
                                <p className="ps-4">{merchant_account_holder_name} </p>
                            </div>
                            <div className="d-flex justify-content-start pb-1">
                                <p className="text-dark w-40">Account Number:</p>
                                <p className="ps-4">{merchant_account_number} </p>
                            </div>
                        </div>
                        <div className="btn btn-primary btn-eidt" onClick={() => {toggleModal("bank")}}>Edit</div>
                    </div>
                    : 
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p>You did not add any Bank Account Details</p>

                        <div className="btn btn-secondary" onClick={() => {toggleModal("bank")}}>Add Bank</div>
                    </div>
                    }
                    
                </div>
                {/* End: bank account */}
                
                {/* MFS */}
                <div className="card  p-4 my-3">
                    <h6 className="pb-3">Mobile Payment Account</h6>
                    {merchant_bikash_number || merchant_nagad_number ? 
                        <div className="payment_bank d-flex flex-row align-items-start">
                            <div className="profile-info flex-grow-1">
                                {merchant_bikash_number ? 
                                    <div className="d-flex justify-content-start pb-1">
                                        <p className="text-dark">Bikash:</p>
                                        <p className="ps-4">{merchant_bikash_number} </p>
                                    </div>
                                    :
                                    <div></div>
                                }
                                {merchant_nagad_number ? 
                                    <div className="d-flex justify-content-start pb-1">
                                        <p className="text-dark pe-1">Nagad:</p>
                                        <p className="ps-4">{merchant_nagad_number} </p>
                                    </div>
                                :
                                    <div></div>
                                }
                            </div>
                            <div className="btn btn-primary btn-eidt" onClick={() => {toggleModal("mfs")}}>Edit</div>
                        </div> 
                    : 
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p>You did not add any Bikash/Nagad Number</p>
                            <div className="btn btn-secondary btn-eidt_bank" onClick={() => {toggleModal("mfs")}}>Add Bikash or Nagad</div>
                        </div>
                    }
                </div>
                {/* End: MFS */}
            </TabPane>
        </TabContent>
        {/* End: TAB - Content */}
        {/* End: tab */}


        {/* Modal */}
        <Modal isOpen={modal} toggle={toggleModal}>
            {form === "profile" && <FormMerchantProfile />}
            {form === "bank" && <FormAddBank />}
            {form === "mfs" && <FormAddMFS />}
            {form === "password" && <FormPassword />}
        </Modal>
        {/* End: modal */}

    </Card>
  )
}

export default CardProfile