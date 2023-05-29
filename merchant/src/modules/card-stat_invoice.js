import moment from "moment";
import { useAppContext } from "../context/appContext";
import { Loading } from "../elements";


const CardInvoices = () => {
    const {
        isLoading,
        last_invoices,
    } = useAppContext();

    return(
        <div className='card h-100'>
            <div className='card-header pt-3 bg-white border-bottom d-flex justify-content-between align-items center'>
                <h5 className="fw-regular">Invoice</h5>
                <p className="mb-0">last 5</p>
            </div>
            <div className="card-body d-flex flex-column pt-0">
                {last_invoices.length > 0 ? 
                    <>
                        {isLoading ? 
                            <Loading />
                            :
                            <>
                                {last_invoices.map((item,index)=>
                                    {return(
                                        <>
                                        {index < 5 ?
                                            <div key={index} className="card-body_item d-flex justify-content-between border-top pt-3 pb-3">
                                                <p className="mb-0">{moment(item.invoice_createdAt).utc().format("MMM DD, YYYY")}</p>
                                                <p className="mb-0 fw-medium text-dark"><span>৳</span> {item.invoice_total_payables}</p>
                                            </div>
                                        :
                                        null
                                        }
                                        </>
                                    )}
                                )}
                            </>
                        }
                    </>
                    :
                    <p className="m-4">You dont have any paid invoices</p>
                }
                {/* Invoice */}
                {/*  */}
                {/* end */}

            </div>
        </div>
    );
}

export default CardInvoices