import { useAppContext } from "../context/appContext";
import { Loading } from "../elements";

const CardStatPayments = () => {
    const {
        isLoading,
        payments_out_for_delivery,
        payments_total_paid,
        payments_in_process,
        payments_due,
    } = useAppContext();

    return(
        <div className='card h-100'>
            <div className='card-header pt-3 bg-white border-bottom'>
                <h5 className="fw-regular">Payments</h5>
            </div>
            <div className="card-body d-flex flex-column">

                {/* No. of Packets on route today*/}
                <div className="card-body_item border-bottom pb-2">
                    <p className="mb-1">Out for Delivery</p>
                    <h1 className=""><span>৳</span>
                        {isLoading ? 
                            <Loading />
                        :
                            payments_out_for_delivery
                        }
                    </h1>
                </div>
                {/* end */}

                {/* No. of Packets in hub today*/}
                <div className="card-body_item d-flex justify-content-between pt-3 pb-3 border-bottom">
                    <p className="mb-0">Total Paid:</p>
                    <p className="mb-0 text-dark fw-medium"><span>৳</span>
                        {isLoading ? 
                            <Loading />
                        :
                            payments_total_paid
                        }
                    </p>
                </div>
                {/* end */}

                {/* No. of Packets deleivered today */}
                <div className="card-body_item d-flex justify-content-between pt-3 pb-3 border-bottom">
                    <p className="mb-0">Payment In-Process:</p>
                    <p className="mb-0 text-success fw-medium"><span>৳</span>
                        {isLoading ? 
                            <Loading />
                        :
                            payments_in_process
                        }
                    </p>
                </div>
                {/* end */}

                 {/* No. of Packets returned today */}
                 <div className="card-body_item d-flex justify-content-between pt-3 pb-1">
                    <p className="mb-0">Payment Due:</p>
                    <p className="mb-0 text-danger fw-medium"><span>৳</span>
                        {isLoading ? 
                            <Loading />
                        :
                            payments_due
                        }
                    </p>
                </div>
                {/* end */}

            </div>
        </div>
    );
}

export default CardStatPayments