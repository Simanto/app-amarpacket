import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import { IconUser } from '../assets/images'

const NavBarBottom = () => {
  return (
    <Row className='bar-bottom d-flex'>
        {/* Dashboard */}
        <Col className='bar-item m-0 p-1'>
            <Link to={"/agent/dashboard"} className="d-block d-flex flex-column text-center">
                <div className="bar-item_icon pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon'>
                        <path fill="none" d="M0 0h24v24H0z"/><path d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z" fill='currentColor'/>
                    </svg>
                </div>
                <div className='bar-item_label'>
                    <span>Dashboard</span>
                </div>
            </Link>
        </Col>

        {/* Pickup */}
        <Col className='bar-item m-0 p-1'>
            <Link to={"/agent/pickup"} className="d-block d-flex flex-column text-center">
                <div className="bar-item_icon pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon'>
                        <path fill="none" d="M0 0h24v24H0z"/><path d="M8.965 18a3.5 3.5 0 0 1-6.93 0H1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2h3l3 4.056V18h-2.035a3.5 3.5 0 0 1-6.93 0h-5.07zM15 7H3v8.05a3.5 3.5 0 0 1 5.663.95h5.674c.168-.353.393-.674.663-.95V7zm2 6h4v-.285L18.992 10H17v3zm.5 6a1.5 1.5 0 1 0 0-3.001 1.5 1.5 0 0 0 0 3.001zM7 17.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" fill='currentColor' />
                    </svg>
                </div>
                <div className='bar-item_label'>
                    <span>Pickup</span>
                </div>
            </Link>
        </Col>

        {/* Delivery */}
        <Col className='bar-item m-0 p-1'>
            <Link to={"/agent/deliveries/all"} className="d-block d-flex flex-column text-center">
                <div className="bar-item_icon pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon'>
                        <path fill="none" d="M0 0h24v24H0z"/><path d="M16,1 C16.5522847,1 17,1.44771525 17,2 L17,3 L22,3 L22,9 L19.9813388,9 L22.7270773,16.5438545 C22.9032836,16.9948332 23,17.4856276 23,17.9990113 C23,20.2081503 21.209139,21.9990113 19,21.9990113 C17.1365166,21.9990113 15.5706587,20.7247255 15.1262721,19 L10.8739825,19 C10.4299397,20.7252272 8.86383943,22 7,22 C5.05550552,22 3.43507622,20.612512 3.0747418,18.7735658 C2.43596423,18.4396361 2,17.7707305 2,17 L2,7 C2,6.44771525 2.44771525,6 3,6 L10,6 C10.5522847,6 11,6.44771525 11,7 L11,12 C11,12.5522847 11.4477153,13 12,13 L14,13 C14.5522847,13 15,12.5522847 15,12 L15,3 L12,3 L12,1 L16,1 Z M7,16 C5.8954305,16 5,16.8954305 5,18 C5,19.1045695 5.8954305,20 7,20 C8.1045695,20 9,19.1045695 9,18 C9,16.8954305 8.1045695,16 7,16 Z M19,15.9990113 C17.8954305,15.9990113 17,16.8944418 17,17.9990113 C17,19.1035808 17.8954305,19.9990113 19,19.9990113 C20.1045695,19.9990113 21,19.1035808 21,17.9990113 C21,17.7586785 20.9576092,17.5282466 20.8798967,17.3147849 L20.8635387,17.2714329 C20.5725256,16.5266202 19.8478776,15.9990113 19,15.9990113 Z M17.8529833,9 L16.9999998,9 L16.9999998,12 C16.9999998,13.6568542 15.6568542,15 13.9999998,15 L11.9999998,15 C10.3431458,15 8.99999976,13.6568542 8.99999976,12 L3.99999976,12 L3.99999976,15.3541759 C4.73294422,14.523755 5.80530734,14 6.99999976,14 C8.86383943,14 10.4299397,15.2747728 10.8739825,17 L15.1257631,17 C15.569462,15.2742711 17.1358045,13.9990113 18.9999998,13.9990113 C19.2368134,13.9990113 19.4688203,14.0195905 19.6943299,14.0590581 L17.8529833,9 Z M8.99999976,8 L3.99999976,8 L3.99999976,10 L8.99999976,10 L8.99999976,8 Z M20,5 L17,5 L17,7 L20,7 L20,5 Z" fill='currentColor'/>
                    </svg>
                </div>
                <div className='bar-item_label'>
                    <span>Delivery</span>
                </div>
            </Link>
        </Col>

        {/* Profile */}
        <Col className='bar-item m-0 p-1'>
            <Link to={"/agent/profile"} className="d-block d-flex flex-column text-center">
                <div className="bar-item_icon pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='icon'>
                        <path fill="none" d="M0 0h24v24H0z"/><path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill='currentColor'/>
                    </svg>
                </div>
                <div className='bar-item_label'>
                    <span>Profile</span>
                </div>
            </Link>
        </Col>
    </Row>
  )
}

export default NavBarBottom