import { Button } from 'reactstrap';
import {IllustationMap} from '../assets/images'

const CardAddPacket = () => {
    return(
        <div className='card h-100'>
            <div className="d-flex flex-column justify-content-center p-3">
                {/* illustration */}
                <div className="illustration py-1 text-center">
                    <img src={IllustationMap} alt='add packet' />
                </div>
                {/* end */}

                {/* content */}
                <h5 className='text-center fw-regular pt-3 mb-2'>Add a new packet</h5>
                <p className='text-center px-5'>Fill out the form to create a new packet. </p>
                {/* end */}

                {/* cta */}
                <div className='text-center pb-4'>
                    <Button href='packets/add-packet' color='primary text-uppercase fw-medium mb-2'> Add Packet</Button>
                </div>
                
                {/* end */}
            </div>
        </div>
    );
}

export default CardAddPacket