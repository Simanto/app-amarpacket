// import { Col, Container, Row } from "reactstrap";
import moment from 'moment';
import React, { useEffect }  from 'react';
import Moment from 'react-moment';
import { Col, Row } from 'reactstrap';
import { useAppContext } from '../../context/appContext';
import {CardStatDeleveries, CardStatPayments, CardInvoices, CardAddPacket, AllPackets, TableMerchantOutForDelivery} from '../../modules'

const Dashboard = () =>{
    const {getDeliveryStats} = useAppContext();

    useEffect(() => {
        getDeliveryStats();
    }, [])
    

    return(
        // App Wrapper
        <div>
            {/* Header */}
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>Dashboard</h4>
                </div>
                <div className='app-header_date d-flex justify-content-center align-items-center'>
                    <div className='icon'>
                        <svg width="18" height="18" viewBox="0 0 18 18">
                            <path d="M12.75 2.25H15.75C15.9489 2.25 16.1397 2.32902 16.2803 2.46967C16.421 2.61032 16.5 2.80109 16.5 3V15C16.5 15.1989 16.421 15.3897 16.2803 15.5303C16.1397 15.671 15.9489 15.75 15.75 15.75H2.25C2.05109 15.75 1.86032 15.671 1.71967 15.5303C1.57902 15.3897 1.5 15.1989 1.5 15V3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H5.25V0.75H6.75V2.25H11.25V0.75H12.75V2.25ZM11.25 3.75H6.75V5.25H5.25V3.75H3V6.75H15V3.75H12.75V5.25H11.25V3.75ZM15 8.25H3V14.25H15V8.25Z" />
                        </svg>
                    </div>
                    <p className='mb-0'>
                        <Moment format="DD MMM, YYYY" />
                    </p>
                </div>
            </div>
            {/* End */}

            {/* Card Group */}
            <div className='app-inner px-4 pt-1'>
                <div className='app-inner_body w-100 d-block'>
                    <Row>
                        <Col>
                            <CardStatDeleveries />
                        </Col>
                        <Col>
                            <CardStatPayments />
                        </Col>
                        <Col>
                            <CardInvoices />
                        </Col>
                        <Col>
                            <CardAddPacket />
                        </Col>
                    </Row>
                </div>
                <div className='card mt-5'>
                    <h6 className='pt-4 p-4 border-bottom'>PACKETS OUT FOR DLIEVERY</h6>
                    <TableMerchantOutForDelivery />
                </div>
            </div>
            {/* End: card group */}
        </div>
        // End of App Wrapper
    );
}

export default Dashboard