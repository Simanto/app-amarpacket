import React, { useEffect } from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button, Col, Row, Table } from 'reactstrap';
import Moment from 'react-moment';
import { useAppContext } from '../../context/appContext.js';
import TableInvoicePackets from '../../modules/table-invoice_packets.js';
import { Logo } from '../../assets/images/index.js';

const PaymentsSingle = () => {
  const {
    invoice_createdAt,
    invoice_trackingID,
    invoice_merchant_business_name,
    invoice_merchant_business_phone,
    invoice_merchant_business_address,
    invoice_total_payables,

    // async function
    admingGetInvoicePacketsByID,
  } = useAppContext();

  useEffect(() => {
    admingGetInvoicePacketsByID();
  }, [])
  
  const createPDF = async () => {   
    const pdf = new jsPDF("portrait", "pt", "a4"); 
    const data = await html2canvas(document.querySelector("#pdf"));
    const img = data.toDataURL("image/png");  
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 50, pdfWidth, pdfHeight);
    pdf.save(`invoice-${invoice_trackingID}.pdf`);
  };

  return (
    <>
     {/* Header */}
     <div className='app-header p-4 d-flex flex-row justify-content-between'>
        <div className='app-header_title pt-1'>
            <h4>Invoice #<span className='text-uppercase'>{invoice_trackingID}</span></h4>
        </div>
        <div>
          <Button color='dark' onClick={createPDF}>
            Download PDF
          </Button>
        </div>
      </div>
      {/* End */}

      {/* Body */}
      <div className="card mx-4">
        <div id="pdf">
          <div className='brand-logo m-5 visually-hidden' data-html2canvas-ignore="false" >
            <img src={Logo} alt="Amar Packet" />
          </div>
          <div className='d-flex justify-content-between p-5'>
            <div className='invoice-merchant'>
              <h6>Invoice to</h6>
              <h4 className='mb-2'> {invoice_merchant_business_name} </h4>
              <p className='mb-1'>Phone: {invoice_merchant_business_phone} </p>
              <p className='mb-1'>Address: {invoice_merchant_business_address} </p>
            </div>
            <div className='invoice-details'>
              <Table
              bordered
              striped
              >
                <tbody>
                  <tr>
                    <th className='px-4'>
                      Total Paid Out 
                    </th>
                    <td className='text-end px-4'>
                      TK. <span> {invoice_total_payables} </span>
                    </td>
                  </tr>

                  <tr>
                    <th className='px-4'>
                      Invoice Date
                    </th>
                    <td className='text-end px-4'>
                        <Moment date={invoice_createdAt} format="MMM D, YYYY"/>
                    </td>
                  </tr>
                  <tr>
                    <th className='px-4'>
                      Invoice ID
                    </th>
                    <td className='text-end px-4 text-uppercase'>
                      {invoice_trackingID}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className='invoice-packets'>
            <TableInvoicePackets />
          </div>
          <div className='notice m-5 visually-hidden'>
            <h6>Notice:</h6>
            <ol>
              <li>Payment should be made within 48 hours by bank or mobile-banking.</li>
              <li>This is a computer generated invoice and requires no signature</li>
            </ol>
          </div>
        </div>
      </div>
      {/* End */}
    </>
  )
}

export default PaymentsSingle