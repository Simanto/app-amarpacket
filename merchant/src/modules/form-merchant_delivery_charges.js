import React, { useState } from 'react'
import { Col, Form, Input, Row } from 'reactstrap'

const initialState = {
    D25024: 30,
}

const FormMerchantDeliveryCharges = () => {
    const [value, setValue] = useState(initialState);
    const handleInput = (e) =>{}
    
    return (
        <div className='delivery-charges'>
            {/* Form Header */}
            <div className='row'>
                {/* Card: Header */}
                <div className="card-header_overline">
                    <h6 className="text-overline">Delivery Charges</h6>
                </div>
                {/* Card: End */}
            </div>

            <Row className='bg-warning align-items-stretch'>
                <Col className='d-flex justify-content-center border-end border-bottom'>
                    <h6 className='pt-2 pb-1  align-self-center'>Weight</h6>
                </Col>
                <Col className='border-end p-0 m-0'>
                    <h6 className='pt-3 pb-3 m-0 text-center border-bottom'>ISD</h6>
                    <Row className='p-0 m-0'>
                        <Col className='p-0 m-0'>
                            <h6 className='pt-2 pb-2 mb-0 text-center border-end border-bottom'>24</h6>
                        </Col>
                        <Col className='p-0 m-0'>
                            <h6 className='pt-2 pb-2 mb-0 text-center border-bottom'>6</h6>
                        </Col>
                    </Row>
                </Col>
                <Col className='border-end p-0 m-0 align-items-stretch'>
                    <h6 className='pt-3 pb-3 m-0 text-center border-bottom'>OSD</h6>
                    <Row>
                        <Col className='pe-0'>
                            <h6 className='pt-2 pb-2 mb-0 text-center border-end border-bottom'>Zila</h6>
                        </Col>
                        <Col  className='ps-0'>
                            <h6 className='pt-2 pb-2 mb-0 text-center border-bottom'>Upzila</h6>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Form>
                <Row className='align-items-stretch'>
                    <Col className='d-flex justify-content-center border-start border-end border-bottom flex-grow-0'>
                        <h6 className='pt-2 pb-1  align-self-center'>Upto 250 Gram</h6>
                    </Col>
                    <Col className='border-end border-bottom p-0 m-0'>
                        <Row className='p-0 m-0'>
                            <Col className='p-0 m-0'>
                                {/* <Input
                                    className='m-2'
                                    id="25024"
                                    name="25024"
                                    placeholder="Enter your full name"
                                    type="text"
                                    onChange={handleInput} 
                                    value={value.D25024}
                                /> */}
                            </Col>
                            <Col className='p-0 m-0'>
                                <h6 className='pt-3 pb-3 mb-0 text-center border-bottom'>6</h6>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='border-end border-bottom p-0 m-0'>
                        <Row>
                            <Col className='pe-0'>
                                <h6 className='pt-3 pb-3 mb-0 text-center border-end border-bottom'>Zila</h6>
                            </Col>
                            <Col className='ps-0'>
                                <h6 className='pt-3 pb-3 mb-0 text-center border-bottom'>Upzila</h6>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default FormMerchantDeliveryCharges