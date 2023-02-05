import moment from 'moment'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { ElementTable, Loading, TableColumnFilter } from '../elements'

const TableMerchantAllPayment = () => {
  const {invoices,setEditInvoice} = useAppContext()
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        Filter: TableColumnFilter,
      },
      {
        Header: "Date",
        accessor: "invoice_createdAt",
        Filter: TableColumnFilter,
        Cell: ({ row }) =>  moment(row.values.invoice_createdAt).utc().format("MMM D, YY"),
      },
      {
        Header: "Invoice ID",
        accessor: "invoice_trackingID",
        Filter: TableColumnFilter,
        Cell: ({ row }) =>  (<><p className="mb-1 d-block d-sm-none text-secondary">Invoice ID</p><span className="text-uppercase fw-medium"> {row.values.invoice_trackingID} </span></>),
      },
      {
        Header: "Amount Collected",
        accessor: "invoice_total_collection_amount",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none text-secondary">Collected</p><span className='fw-medium text-secondary'>TK. {row.values.invoice_total_collection_amount}</span></>),
      },
      {
        Header: "Delivery Charges",
        accessor: "invoice_total_delivery_charge",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none text-danger">Cahrges</p><span className='fw-medium text-danger'>TK. {row.values.invoice_total_delivery_charge}</span></>),
      },
      {
        Header: "Recieved",
        accessor: "invoice_total_payables",
        Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none text-success">Recieved</p><span className='fw-medium text-success'>TK. {row.values.invoice_total_payables}</span></>),
        Filter: TableColumnFilter,
      },
      {
        Header: "Status",
        accessor: "invoice_status",
        Cell: ({ row }) => {
          return(
            <>
            <span className={"text-uppercase status alert alert-info"}> {row.values.invoice_status}</span>
            </>
          )
        },
        Filter: TableColumnFilter,
      },
      {
        Header: "Action",
        accessor: "attributes.invoice_merchant_name",
        Filter: TableColumnFilter,
        Cell: ({row}) => {
          return (
            <div className="d-flex justify-content-start">
              <Link to={{pathname:`/payment/${row.original._id}`}} className="action action-view me-2" id="View" alt="View" onClick={ () => setEditInvoice(`${row.original._id}`) }>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                  <path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor" />
                </svg>
                <span className="d-block d-sm-none fw-medium">VIEW</span>
              </Link>
            </div>
          )
        }
      }
    ],
    []
    );
    const initialState = { hiddenColumns: ['_id'] };
  return (
    <>
    {invoices ?
      <ElementTable columns={columns} initialState={initialState} data={invoices}  filterCmponents={["search"]} />
      :
      <Loading />
    }
    </>
  )
}

export default TableMerchantAllPayment