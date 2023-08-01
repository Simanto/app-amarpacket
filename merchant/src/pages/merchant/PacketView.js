import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap"
import {useReactToPrint} from 'react-to-print';
import { useAppContext } from "../../context/appContext";
import { LabelPrint, Loading } from "../../elements";


const PacketView = () =>{
    const [deliveryCharge, setDeliveryCharge] = useState();
    const [path, setPath] = useState()
    const [vat, setVat] = useState();
    const [total, setTotal] = useState()
    const {isLoading,singlePacket,user} = useAppContext();
    const params = useParams();
    const printRef = useRef(null);

    useEffect(() => {

        if(user.role === "admin" || user.role === "admin" ){
            setPath("/admin/packets/weekly")
        } else {
            setPath("/packets/all")
        }

        let charge =  singlePacket.delivery_charge;            
        setDeliveryCharge(((charge)/1.15).toFixed(2));
        setVat((charge-deliveryCharge).toFixed(2));
        setTotal(singlePacket.collectionAmount-charge)

    }, [params,deliveryCharge,singlePacket]);

    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });

    
    return(
        <div>
        {isLoading ?
            <Loading />
            :
            <Container fluid>
                {/* Header */}
                <Row>
                    <Col className='app-header m-4 d-flex flex-row justify-content-start align-items-center'>
                        <div className="app-header_back pb-3">
                            <Link to={path} className="icon"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="me-2"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="currentColor"/></svg>
                                Back to Packets
                            </Link>
                        </div>
                    </Col>
                </Row>
                {/* End */}


                {/* Body */}
                <Row className="d-flex justify-content-center" >
                    <Col md="9" className="card p-0">
                        {/* card: header */}
                        <div className="card-header p-5 d-flex flex-column flex-sm-row justify-content-between ">
                            <div className="card-header_details mb-4">
                                <h6 className="text-uppercase mb-4">Packet Details</h6>
                                <div className="card-header-id d-flex">
                                    <p className="text-black-50 me-2 mb-1">id:</p>
                                    <p className="text-dark text-uppercase mb-0">{singlePacket._id}</p>
                                </div>
                                <div className="card-header-id d-flex pt-0">
                                    <p className="text-black-50 me-2 mb-1">Tracking ID:</p>
                                    <p className="text-dark text-uppercase mb-0">{singlePacket.trackingID}</p>
                                </div>
                                <div className="card-header-id d-flex pt-0">
                                    <p className="text-black-50 me-2 mb-1">Date:</p>
                                    <p className="text-dark mb-0">{moment(singlePacket.createdAt).format("MMM D, YYYY")}</p>
                                </div>
                                {singlePacket.invoice_trackingID &&
                                <div className="card-header-id d-flex pt-0">
                                    <p className="text-black-50 me-2 mb-1">Invoice ID:</p>
                                    <p className="text-uppercase text-dark mb-0">{singlePacket.invoice_trackingID}</p>
                                </div>
                                }
                            </div>
                            <div className="button-wrapper"> 
                                <Button className="btn btn-dark text-uppercase fw-medium" onClick={handlePrint}>
                                    <span className="icon-20 me-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 17h10v5H7v-5zm12 3v-5H5v5H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2zM5 10v2h3v-2H5zm2-8h10a1 1 0 0 1 1 1v3H6V3a1 1 0 0 1 1-1z" fill="currentColor" /></svg>
                                    </span>

                                    Print
                                </Button>
                                
                                <div className="visually-hidden">
                                    <LabelPrint items={singlePacket} ref={printRef} />
                                </div>

                            </div>
                        </div>
                        {/* End card header */}

                        {/* card: body */}
                        <div className="card-body p-5 ">
                            <Row className="justify-content-between align-items-start">
                                {/* Customer Details */}
                                <Col sm="12" md="3" className="mb-4">
                                    <div className="customer-details">
                                        <h6 className="text-uppercase mb-4">Customer Details</h6>
                                        <div className="card-header-id">
                                            <p className="text-black-50 me-2 mb-1">Name:</p>
                                            <p className="text-dark">{singlePacket.customerName}</p>
                                        </div>
                                        <div className="card-header-id pt-0">
                                            <p className="text-black-50 me-2 mb-1">Phone:</p>
                                            <p className="text-dark">{singlePacket.customerPhone}</p>
                                        </div>
                                        <div className="card-header-id pt-0">
                                            <p className="text-black-50 me-2 mb-1">Address:</p>
                                            <p className="text-dark">{singlePacket.customerAddress}</p>
                                        </div>
                                        <div className="card-header-notes mt-2">
                                            {singlePacket.specialInstruction ?  
                                                <div class="alert alert-primary" role="alert">
                                                    Notes: {singlePacket.specialInstruction} 
                                                </div>
                                                : 
                                                ""
                                            }
                                        </div>
                                    </div>
                                </Col>
                                {/* Packet Status */}
                                <Col sm="12"  md="5" className="mb-4">
                                    <h6 className="text-uppercase mb-4">Tracking Details</h6>
                                    <div className="timeline">
                                        {singlePacket.status ? 
                                            <>
                                                {singlePacket.status.map((value)=>{
                                                    return value.name === "new" ? (
                                                        <div className="timeline-item" key={value._id}>
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c4.97 0 9 4.043 9 9.031V20H3v-8.969C3 6.043 7.03 2 12 2zM9.5 21h5a2.5 2.5 0 1 1-5 0z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <span className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</span>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">New Request</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "accepted" ? (
                                                        
                                                        <div className="timeline-item" key={value._id}>
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 10h18v10.004c0 .55-.445.996-.993.996H3.993A.994.994 0 0 1 3 20.004V10zm6 2v2h6v-2H9zM2 4c0-.552.455-1 .992-1h18.016c.548 0 .992.444.992 1v4H2V4z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <span className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</span>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">Request Accepted</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : value.name === "assigned-for-pickup" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M14 14.252V22H4a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm6 4v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">Assigned For Pickup</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "out-for-pickup" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16,1 C16.5522847,1 17,1.44771525 17,2 L17,3 L22,3 L22,9 L19.980979,9 L22.7270773,16.5448432 C22.9032836,16.9958219 23,17.4866163 23,18 C23,20.209139 21.209139,22 19,22 C17.1361606,22 15.5700603,20.7252272 15.1260175,19 L10.8739825,19 C10.4299397,20.7252272 8.86383943,22 7,22 C5.05550552,22 3.43507622,20.612512 3.0747418,18.7735658 C2.43596423,18.4396361 2,17.7707305 2,17 L2,7 C2,6.44771525 2.44771525,6 3,6 L10,6 C10.5522847,6 11,6.44771525 11,7 L11,12 C11,12.5522847 11.4477153,13 12,13 L14,13 C14.5522847,13 15,12.5522847 15,12 L15,3 L12,3 L12,1 L16,1 Z M19,16 C17.8954305,16 17,16.8954305 17,18 C17,19.1045695 17.8954305,20 19,20 C20.1045695,20 21,19.1045695 21,18 C21,17.7596672 20.9576092,17.5292353 20.8798967,17.3157736 L20.8635387,17.2724216 C20.5725256,16.5276089 19.8478776,16 19,16 Z M7,16 C5.8954305,16 5,16.8954305 5,18 C5,19.1045695 5.8954305,20 7,20 C8.1045695,20 9,19.1045695 9,18 C9,16.8954305 8.1045695,16 7,16 Z M9,8 L4,8 L4,10 L9,10 L9,8 Z M20,5 L17,5 L17,7 L20,7 L20,5 Z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">out for pickup</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "at-hub" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 19h3v-6.058L8 9.454l-4 3.488V19h3v-4h2v4zm12 2H3a1 1 0 0 1-1-1v-7.513a1 1 0 0 1 .343-.754L6 8.544V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1zm-5-10v2h2v-2h-2zm0 4v2h2v-2h-2zm0-8v2h2V7h-2zm-4 0v2h2V7h-2z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">at hub</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "assigned-for-delivery" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M14 14.252V22H4a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm6 4v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">Assigned for delivery</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ):  value.name === "out-for-delivery" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16,1 C16.5522847,1 17,1.44771525 17,2 L17,3 L22,3 L22,9 L19.980979,9 L22.7270773,16.5448432 C22.9032836,16.9958219 23,17.4866163 23,18 C23,20.209139 21.209139,22 19,22 C17.1361606,22 15.5700603,20.7252272 15.1260175,19 L10.8739825,19 C10.4299397,20.7252272 8.86383943,22 7,22 C5.05550552,22 3.43507622,20.612512 3.0747418,18.7735658 C2.43596423,18.4396361 2,17.7707305 2,17 L2,7 C2,6.44771525 2.44771525,6 3,6 L10,6 C10.5522847,6 11,6.44771525 11,7 L11,12 C11,12.5522847 11.4477153,13 12,13 L14,13 C14.5522847,13 15,12.5522847 15,12 L15,3 L12,3 L12,1 L16,1 Z M19,16 C17.8954305,16 17,16.8954305 17,18 C17,19.1045695 17.8954305,20 19,20 C20.1045695,20 21,19.1045695 21,18 C21,17.7596672 20.9576092,17.5292353 20.8798967,17.3157736 L20.8635387,17.2724216 C20.5725256,16.5276089 19.8478776,16 19,16 Z M7,16 C5.8954305,16 5,16.8954305 5,18 C5,19.1045695 5.8954305,20 7,20 C8.1045695,20 9,19.1045695 9,18 C9,16.8954305 8.1045695,16 7,16 Z M9,8 L4,8 L4,10 L9,10 L9,8 Z M20,5 L17,5 L17,7 L20,7 L20,5 Z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">Out for delivery</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ):  value.name === "delivered" || value.name === "delivery-done" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path fill="none" d="M0 0h24v24H0z"/><path d="M9.33 11.5h2.17A4.5 4.5 0 0 1 16 16H8.999L9 17h8v-1a5.578 5.578 0 0 0-.886-3H19a5 5 0 0 1 4.516 2.851C21.151 18.972 17.322 21 13 21c-2.761 0-5.1-.59-7-1.625L6 10.071A6.967 6.967 0 0 1 9.33 11.5zM4 9a1 1 0 0 1 .993.883L5 10V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h2zm9.646-5.425L14 3.93l.354-.354a2.5 2.5 0 1 1 3.535 3.536L14 11l-3.89-3.89a2.5 2.5 0 1 1 3.536-3.535z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">delivered</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "on-hold-at-hub" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17.618 5.968l1.453-1.453 1.414 1.414-1.453 1.453a9 9 0 1 1-1.414-1.414zM11 8v6h2V8h-2zM8 1h8v2H8V1z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">On Hold at Hub</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "partial-return" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm12 4v2h-4v2h4v2l3.5-3L15 7zM9 17v-2h4v-2H9v-2l-3.5 3L9 17z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">Partial Return</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "canceled" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">Canceled</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "assigned-for-return" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M14 14.252V22H4a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm6 4v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">Assigned for return</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "out-for-return" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16,1 C16.5522847,1 17,1.44771525 17,2 L17,3 L22,3 L22,9 L19.980979,9 L22.7270773,16.5448432 C22.9032836,16.9958219 23,17.4866163 23,18 C23,20.209139 21.209139,22 19,22 C17.1361606,22 15.5700603,20.7252272 15.1260175,19 L10.8739825,19 C10.4299397,20.7252272 8.86383943,22 7,22 C5.05550552,22 3.43507622,20.612512 3.0747418,18.7735658 C2.43596423,18.4396361 2,17.7707305 2,17 L2,7 C2,6.44771525 2.44771525,6 3,6 L10,6 C10.5522847,6 11,6.44771525 11,7 L11,12 C11,12.5522847 11.4477153,13 12,13 L14,13 C14.5522847,13 15,12.5522847 15,12 L15,3 L12,3 L12,1 L16,1 Z M19,16 C17.8954305,16 17,16.8954305 17,18 C17,19.1045695 17.8954305,20 19,20 C20.1045695,20 21,19.1045695 21,18 C21,17.7596672 20.9576092,17.5292353 20.8798967,17.3157736 L20.8635387,17.2724216 C20.5725256,16.5276089 19.8478776,16 19,16 Z M7,16 C5.8954305,16 5,16.8954305 5,18 C5,19.1045695 5.8954305,20 7,20 C8.1045695,20 9,19.1045695 9,18 C9,16.8954305 8.1045695,16 7,16 Z M9,8 L4,8 L4,10 L9,10 L9,8 Z M20,5 L17,5 L17,7 L20,7 L20,5 Z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">out for return</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): value.name === "returned" ? (
                                                        <div className="timeline-item">
                                                            <div className="timeline-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z" fill="currentColor"/></svg>
                                                            </div>
                                                            <div className="timeline-details">
                                                                <p className="timeline-details_meta text-uppercase text-black-50 mb-0">{moment(value.createdAt).format("D MMM  h:mm a")}</p>
                                                                <div className="timeline-details_content">
                                                                    <p className="mb-1 text-capitalize text-dark">Returned</p>
                                                                    <p className="text-black-50">{value.message}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ): ""
                                                })}
                                            </> 
                                            : 
                                            ""
                                        }
                                        
                                    </div>
                                </Col>
                                {/* Delivery Charges */}
                                <Col sm="12" md="4" className="bg-light p-4">
                                    <h6 className="pb-3">You will recieve</h6>
                                    <div className="d-flex justify-content-between">
                                        <p>Collection Amount</p>
                                        <p>Tk. {singlePacket.collectionAmount}</p>
                                    </div>
                                    
                                    <div className="d-flex justify-content-between">
                                        <p>Delivery Charge</p>
                                        <p className="text-danger">(Tk. {deliveryCharge ? deliveryCharge : 0})</p>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom mb-3">
                                        <p>VAT 15%</p>
                                        <p className="text-danger">(Tk.
                                            {vat ? 
                                                <>{vat ? vat : 0}</>
                                            : 0}
                                        )
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5>Total</h5>
                                        <h5 className="text-success">Tk. {total ? total : 0}</h5>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {/* end */}
                    </Col>
                </Row>
                {/* End: Body */}
            </Container>
        }
        </div>
    )
}

export default PacketView