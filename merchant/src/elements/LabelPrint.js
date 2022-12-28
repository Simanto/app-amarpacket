import React from 'react';
import Barcode from 'react-barcode';
import { LogoPrint } from '../assets/images';
import { useAppContext } from '../context/appContext';



const LabelPrint = React.forwardRef(({items}, ref) => {
    
    const {data} = useAppContext();

    return (
        <div className="print-label" ref={ref}>
            <div className='print-label_brand'>
                <img src={LogoPrint} alt='Amar Packet'/>
            </div>

            <div className='print-label_section section-merchant d-flex'>
                <p className='mb-0 label-ft'>From:</p>
                <div>
                    <h6 className='mb-1 fw-bold'>{data.business_name}</h6>
                    <p className='mb-0'>Phone: {data.phone}</p>
                </div>
            </div>

            <div className='print-label_section section-customer d-flex'>
                <p className='mb-0 label-ft'>To:</p>
                <div>
                    <h6 className='mb-1 fw-bold'> {items.customerName} </h6>
                    <p className='mb-1'>Phone: {items.customerPhone}</p>
                    <p className='mb-1'>Address: {items.customerAddress} </p>
                    {/* <p className='mb-0'>Notes: {items.specialInstruction} </p> */}
                </div>
            </div>

            <div className='print-label_section section-collection text-center'>
                <p className='mb-1'>Amoutn to Collect:</p>
                <h4 className='mb-1 fw-bold'>Tk {items.collectionAmount} </h4>
            </div>

            <div className='section-barcode text-center'>
                <Barcode value={items.trackingID} width={2} renderer={"img"} />
            </div>
        </div>
    )
});

export default LabelPrint