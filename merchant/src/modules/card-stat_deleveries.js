import { useAppContext } from "../context/appContext";
import { Loading } from "../elements";


const CardStatDeleveries = () => {
    const {
        isLoading,
        deleveries_out_for_delivery,
        deleveries_total_packets,
        deleveries_total_delivered,
        deleveries_total_returned
    } = useAppContext();
    return(
        <div className='card h-100'>
            <div className='card-header pt-3 bg-white border-bottom'>
                <h5 className="fw-regular">Deleveries</h5>
            </div>
            <div className="card-body d-flex flex-column">

                {/* No. of Packets on route today*/}
                <div className="card-body_item border-bottom pb-2">
                    <p className="mb-1">Out for Delivery</p>
                        {isLoading ? 
                            <Loading />
                        :
                            <h1 className="">
                            {deleveries_out_for_delivery}
                            </h1>
                        }
                </div>
                {/* end */}

                {/* No. of Packets in hub today*/}
                <div className="card-body_item d-flex justify-content-between pt-3 pb-3 border-bottom">
                    <p className="mb-0">Total Packets:</p>
                        {isLoading ? 
                            <Loading />
                        :
                            <p className="mb-0 text-dark fw-medium">
                                {deleveries_total_packets}
                            </p>
                        }
                </div>
                {/* end */}

                {/* No. of Packets deleivered today */}
                <div className="card-body_item d-flex justify-content-between pt-3 pb-3 border-bottom">
                    <p className="mb-0">Total Deleivered:</p>
                        {isLoading ? 
                            <Loading />
                        :
                            <p className="mb-0 text-success fw-medium">
                                {deleveries_total_delivered}
                            </p>
                        }
                </div>
                {/* end */}

                 {/* No. of Packets returned today */}
                 <div className="card-body_item d-flex justify-content-between pt-3 pb-1">
                    <p className="mb-0">Total Returned:</p>
                        {isLoading ? 
                            <Loading />
                        :
                        <p className="mb-0 text-danger fw-medium">
                            {deleveries_total_returned}
                        </p>
                        }
                </div>
                {/* end */}

            </div>
        </div>
    );
}

export default CardStatDeleveries