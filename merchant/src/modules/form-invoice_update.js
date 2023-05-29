import React, { useEffect, useState } from 'react'
import { Button, Form, Label, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { paymentStatus } from '../assets/doc/options.js';
import { useAppContext } from '../context/appContext.js'
import { Alert, InputSelect} from '../elements';

const FormInvoiceUpdate = () => {
    const {
        showAlert,
        invoiceID,
        invoice_status,
        invoice_trackingID,
        handleChange,
        updateInvoice,
    } = useAppContext();
    const [selected, setSelected] = useState();
    const handleSelect = (option) =>{
        setSelected(option)
        handleChange({
            name:"invoice_status",
            value: option.value,
        })
    }

    const handleUpdate = () =>{
        updateInvoice();
    }

    useEffect(() => {
        paymentStatus.forEach((item)=>{
            if(item.value === invoice_status){
                setSelected(item);
            }
        })
    }, [])
    
  return (
    <div>
        <ModalHeader>Update Packet #<span className='text-uppercase'>{invoice_trackingID}</span></ModalHeader>

        {/* Error */}
        {showAlert && 
            <div className="p-3">
                    <Alert />
            </div>
        }
        {/* Error: end */}

        <ModalBody>
            <Form>
                {/* Asign Pickup */}
                <div className='p0'>
                        <Label for="Phone" className="fw-medium">
                            Select Status
                        </Label>
                    <InputSelect options={paymentStatus} name="invoice_status" value={selected} defaultValue={selected} placeholder="Select Status" handleChange={handleSelect}/>
                </div>
            </Form>
        </ModalBody>

        <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>
                Update
            </Button>
        </ModalFooter>
    </div>
  )
}

export default FormInvoiceUpdate