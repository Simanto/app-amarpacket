import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { useAppContext } from "../../context/appContext"
import { FormPacket } from "../../modules"

const AddPacket = () =>{
    const [total, setTotal] = useState();
    let calcdelivercharge = 0;

    const {
        handleChange,
        data,
        isEditing,
        setAreaList,
        packet_trackingID,
        packet_collectionAmount,
        packet_weight,
        packet_merchant,
        packet_merchant_phone,
        packet_pcikup_address,
        packet_delivery_charge,
        packet_base_charge
    } = useAppContext();
    
    useEffect(() => {

        setAreaList();
        
        let weight = Math.ceil(packet_weight)

        let charge = 0 ;
       
        if(isEditing && packet_trackingID) {
            charge =  parseInt(packet_base_charge);
        } else {
            charge =  parseInt(data.base_charge);
        }

        
        let weightCharge = 10;

        if(!weight && weight < 1){
            weightCharge = 10;
        }

        if( weight < 1 || packet_weight < 3){
            weightCharge = (weight * 10);
        }

        if(weight>=3){
            weightCharge = 30+((weight-3)* 20);
        }

        calcdelivercharge = charge+weightCharge;

        setTotal(packet_collectionAmount - calcdelivercharge)
        if(
            calcdelivercharge
        ){
            handleChange({
                name: "packet_delivery_charge",
                value: calcdelivercharge
            })
        }
        

    }, [packet_collectionAmount,packet_weight, data, packet_base_charge, calcdelivercharge])

    return(
        <Container>
            <Row>
                <Col>
                    {/* Header */}
                    <div className='app-header pt-4 pb-3'>
                        <div className="app-header_back pb-5">
                            <Link to="/packets" className="icon"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="me-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="currentColor"/></svg>
                                Back to Packets
                            </Link>
                        </div>
                        <div className='app-header_title'>
                            {isEditing && packet_trackingID ? 
                                <h4>Edit Packet  <span className="text-uppercase">#{packet_trackingID}</span></h4> 
                                : 
                                <h4>Add Packet</h4>
                            }
                        </div>
                    </div> 
                </Col>
            </Row>
            <Row>
                <Col md="8">
                    {/* End */}
                    <FormPacket  />
                    
                </Col> 
                
                {/* Floating Card */}
                <Col md="4" className="pt-3">
                    <div className="bg-light">
                        <div className="header p-5 pb-4 border-bottom">
                            <h5 className="mb-3">
                            {isEditing && packet_trackingID ? 
                                packet_merchant
                                :
                                data.business_name
                            }
                            </h5>
                            <p className="mb-2"><span className="fw-medium">Phone:</span> {isEditing && packet_trackingID ?  packet_merchant_phone : data.phone } </p>
                            <p className="m-0 pb-3"><span className="fw-medium">Pickup Address:</span> {isEditing && packet_trackingID ? packet_pcikup_address : data.pickup_address}</p>
                        </div>
                        <div className="p-5">
                            <h6 className="pb-3">You will recieve</h6>
                            <div className="d-flex justify-content-between">
                                <p>Collection Amount</p>
                                <p>Tk. {packet_collectionAmount ? packet_collectionAmount : 0}</p>
                            </div>
                            <div className="d-flex justify-content-between broder border-bottom">
                                <p>Delivery Charge</p>
                                <p className="text-danger">(Tk. 
                                    { packet_weight ? 
                                        <>{packet_delivery_charge && packet_delivery_charge}</>
                                        : 
                                        0
                                    })
                                </p>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <h4>Total</h4>
                                <h4>Tk. {packet_weight  ? total : 0}</h4>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AddPacket