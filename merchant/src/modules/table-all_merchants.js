import { data } from "autoprefixer";
import moment from "moment";
import { Fragment } from "react";
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import { useAppContext } from "../context/appContext";
import { ElementTable,Loading } from "../elements";
import { TableColumnFilter } from "../elements/TableColumnFilter";

const TableAllMerchants = () =>{

  const {isLoading,getAllMerchants, allMerchants,setMerchantID,getMerchantByID} = useAppContext();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "merchantID",
        Filter: TableColumnFilter,
      },
      {
        Header: "Joining Date",
        accessor: "createdAt",
        Filter: TableColumnFilter,
        Cell: ({ row }) =>  moment(row.values.createdAt).utc().format("MMM D, YY"),
      },
      {
        Header: "Name",
        accessor: "merchant_business_name",
        Filter: TableColumnFilter,
      },
      {
        Header: "Phone",
        accessor: "merchant_business_phone",
        Filter: TableColumnFilter,
      },
      {
        Header: "Location",
        accessor: "merchant_pickup_area",
        Filter: TableColumnFilter,
      },
      {
        Header: "Verified",
        accessor: "merchant_isVerified",
        Filter: TableColumnFilter,
        Cell: ({ row }) =>{
          return(
            <>
              {row.values.merchant_isVerified === "true" ? <Badge color="success">Yes</Badge> : <Badge color="danger">no</Badge>}
            </>
          )
        }
      },
      {
        Header: "Notes",
        accessor: "merchant_notes",
        Filter: TableColumnFilter,
      },
      {
        Header: "Action",
        accessor: "attributes.merchant_name",
        Filter: TableColumnFilter,
        Cell: ({row}) => {
          return (
            <div className="d-flex justify-content-start">
              <Link to={{pathname:`/admin/merchant/${row.original.merchantID}`}} className="action action-view me-2" id="View" alt="View" onClick={ () => getMerchantByID(`${row.original.merchantID}`) }>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                  <path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor" />
                </svg>
              </Link>
              <Link to={{pathname:`/admin/merchant/edit/${row.original.merchantID}`}} className="action action-edit" onClick={ () => setMerchantID(`${row.original.merchantID}`) }>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" fill="currentColor" />
                </svg>
              </Link> 
            </div>
          )
        }
      }
    ],
    []
  );
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    getAllMerchants()
  }, []);
  

  const initialState = { hiddenColumns: ['merchantID'] };
  
  return (
    <div className="table">
      {isLoading ? 
        <Loading />
        :
        <ElementTable columns={columns} initialState={initialState} data={allMerchants}   filterCmponents={["search"]} />
      }
    </div>
  );
}

export default TableAllMerchants