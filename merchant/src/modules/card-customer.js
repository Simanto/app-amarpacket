import { Card, CardBody, CardHeader, Col } from 'reactstrap';

const CardCustomer = ({name,phone,address}) => {
    return(
        <Col md="4" className='p-4'>
            <Card className="card p-0">
                <CardHeader className="p-5 pb-3">
                    <h5 className='pb-3 text-captalize'>{name}</h5>
                    <div className='d-flex'>
                        <div className="card-header-id pt-0 me-3">
                            <p className="text-black-50 me-3 mb-0">Phone:</p>
                            <p className="text-dark mb-0">{phone}</p>
                        </div>
                        <div className="card-header-id pt-0">
                            <p className="text-black-50 me-3 mb-0">Address: </p>
                            <p className="text-dark mb-0"> {address}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="d-flex justify-content-between pt-4">
                    <div className="text-center">
                        <h4>20</h4>
                        <p>packets</p>
                    </div>
                    <div className="text-center">
                        <h4>12</h4>
                        <p>Recieved</p>
                    </div>
                    <div className="text-center">
                        <h4>8</h4>
                        <p>Canceled</p>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}

export default CardCustomer