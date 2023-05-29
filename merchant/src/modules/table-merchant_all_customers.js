import moment from 'moment'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { ElementTable, Loading, TableColumnFilter } from '../elements'

const TableMerchantAllCustomer = () => {
  const {allCustomer} = useAppContext()
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "customer_id",
        Filter: TableColumnFilter,
      },
      {
        Header: "Date",
        accessor: "customer_createdAt",
        Filter: TableColumnFilter,
        Cell: ({ row }) =>  moment(row.values.customer_createdAt).utc().format("MMM D, YY"),
      },
      {
        Header: "Name",
        accessor: "customer_name",
        Filter: TableColumnFilter,
      },
      {
        Header: "Phone",
        accessor: "customer_phone",
        Filter: TableColumnFilter,
      },
      {
        Header: "Area",
        accessor: "customer_area",
        width: 300,
        Filter: TableColumnFilter,
      },
      {
        Header: "Total Packets",
        accessor: "customer_total_packets",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none text-secondary">Total</p><span className="text-uppercase fw-medium text-secondary">{row.values.customer_total_packets}</span></>),
      },
      {
        Header: "Delivered",
        accessor: "customer_total_delivered",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none text-success">Delivered</p><span className="text-uppercase fw-medium text-success">{row.values.customer_total_delivered}</span></>),
      },
      {
        Header: "Fialed",
        accessor: "customer_total_canceled",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none text-danger">Failed</p><span className="text-uppercase fw-medium text-danger">{row.values.customer_total_canceled}</span></>),
      },
      {
        Header: "Success Rate",
        accessor: "customer_success_rate",
        Cell: ({ row }) => <span 
          className={`text-uppercase status alert alert-${row.values.customer_success_rate < 50 ? 
          "danger" 
          : row.values.customer_success_rate === "N/A" && 
          row.values.customer_total_canceled > row.values.customer_total_delivered ? 
          "danger" 
          : 
          row.values.customer_success_rate === "N/A" ? "" :
          "success"}`}> 
            {row.values.customer_success_rate === "N/A" && row.values.customer_total_delivered === 0 && row.values.customer_total_canceled > row.values.customer_total_delivered ? "0%" : row.values.customer_success_rate === "N/A" ? "N/A" : <>{row.values.customer_success_rate}%</> }
          </span>,
        Filter: TableColumnFilter,
      },
      // {
      //   Header: "Action",
      //   accessor: "attributes.invoice_merchant_name",
      //   Filter: TableColumnFilter,
      //   Cell: ({row}) => {
      //     return (
      //       <div className="d-flex justify-content-start">
      //         <Link to={{pathname:`/payment/${row.original._id}`}} className="action action-view me-2" id="View" alt="View" onClick={ () => setEditInvoice(`${row.original._id}`) }>
      //           <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
      //             <path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor" />
      //           </svg>
      //         </Link>
      //       </div>
      //     )
      //   }
      // }
    ],
    []
    );
    const initialState = { hiddenColumns: ['customer_id'] };
  return (
    <>
    {allCustomer ?
      <ElementTable columns={columns} initialState={initialState} data={allCustomer}  filterCmponents={["search"]} />
      :
      <Loading />
    }
    </>
  )
}

export default TableMerchantAllCustomer