import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { useAppContext } from "../../context/appContext"
import { FormPacket } from "../../modules"

const AddPacket = () =>{
    const [total, setTotal] = useState();
    const [deliveryCharge, setDeliveryCharge] = useState();

    const {
        handleChange,
        data,
        isEditing,
        setAreaList,
        packet_trackingID,
        packet_collectionAmount,
        packet_weight,
        packet_base_charge,
        packet_merchant,
        packet_merchant_phone,
        packet_pcikup_address,
        packet_delivery_charge,
    } = useAppContext();
    
    useEffect(() => {

        setAreaList();
        
        let charge =  parseInt(packet_base_charge) || parseInt(data.base_charge);
        let weightCharge = 0;

        if(!packet_weight){
            weightCharge = 10;
        }

        if( packet_weight < 1 || packet_weight < 3){
            weightCharge = (packet_weight * 10);
        }

        if(packet_weight>=3){
            weightCharge = 30+((packet_weight-3)* 20);
        }

        const calcdelivercharge = charge+weightCharge;

        setDeliveryCharge(calcdelivercharge)

        setTotal(packet_collectionAmount - calcdelivercharge)

    }, [packet_collectionAmount,packet_weight,packet_base_charge,packet_delivery_charge])

    return(
        <Container>
            <Row>
                <Col md="8">
                    {/* Header */}
                    <div className='app-header pt-4 '>
                        <div className="app-header_back pb-5">
                            <Link to="/packets" className="icon"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="me-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="currentColor"/></svg>
                                Back to Packets
                            </Link>
                        </div>
                        <div className='app-header_title'>
                            {isEditing ? 
                                <h4>Edit Packet  <span className="text-uppercase">#{packet_trackingID}</span></h4> 
                                : 
                                <h4>Add Packet</h4>
                            }
                        </div>
                    </div> 

                    {/* End */}
                    <FormPacket  />
                    
                </Col> 
                
                {/* Floating Card */}
                <Col md="4" className="ps-4 mt-5 pt-5">
                    <div className="bg-light mt-5">
                        <div className="header p-5 pb-4 border-bottom">
                            <h5 className="mb-3">
                            {isEditing ? 
                                packet_merchant
                                :
                                data.business_name
                            }
                            </h5>
                            <p className="mb-2"><span className="fw-medium">Phone:</span> {isEditing ?  packet_merchant_phone : data.phone } </p>
                            <p className="m-0 pb-3"><span className="fw-medium">Pickup Address:</span> {isEditing ? packet_pcikup_address : data.pickup_address}</p>
                        </div>
                        <div className="p-5">
                            <h6 className="pb-3">You will recieve</h6>
                            <div className="d-flex justify-content-between">
                                <p>Collection Amount</p>
                                <p>Tk. {packet_collectionAmount ? packet_collectionAmount : 0}</p>
                            </div>
                            <div className="d-flex justify-content-between broder border-bottom">
                                <p>Delivery Charge</p>
                                <p className="text-danger">(Tk. { packet_collectionAmount > 0 ? <> {packet_delivery_charge && packet_delivery_charge}</> : 0})</p>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <h4>Total</h4>
                                <h4>Tk. {packet_collectionAmount > 0 ? total : 0}</h4>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AddPacket