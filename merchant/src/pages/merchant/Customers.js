import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row } from "reactstrap"
import { useAppContext } from "../../context/appContext"
import { Loading } from "../../elements";
import { CardCustomer, TableMerchantAllCustomer } from "../../modules";

const Customers = () =>{
    const {isLoading,allCustomer, getAllCustomers} = useAppContext();

    useEffect(() => {

        getAllCustomers();

    }, [])
    

    return(
        <div>
            <div className='app-header p-4 d-flex flex-row justify-content-between'>
                <div className='app-header_title pt-1'>
                    <h4>All Customers</h4>
                </div>
                <div className='app-header_date d-flex justify-content-center align-items-center'>
                    <Link to={'/add-packet'} className='btn btn-primary text-uppercase fw-medium mb-2'> Add Packet</Link>
                </div>
            </div>

            {/* All Customers */}
            <div className='app-inner px-4 pt-1'>
                <div className="card pt-2">
                    {isLoading ? 
                        <Loading />
                        :
                        <TableMerchantAllCustomer />
                    }
                </div>
            </div>

            {/* end */}
        </div>
    )
}

export default Customers