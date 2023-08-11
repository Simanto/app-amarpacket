import moment from "moment";
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import { useAppContext } from "../context/appContext";
import { ElementTable,Loading } from "../elements";
import { TableColumnFilter, TableColumnFilterPaymentStatus } from "../elements/TableColumnFilter";
import FormInvoiceUpdate from "./form-invoice_update";

const TableAdminAllInvoices= () =>{

  const {invoices,setEditInvoice} = useAppContext();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleUpdtate = (id) =>{
    setEditInvoice(id);
    toggle();
  }

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
        Cell: ({ row }) =>  <span className="text-uppercase fw-medium"> {row.values.invoice_trackingID} </span>,
      },
      {
        Header: "Merchant",
        accessor: "invoice_merchant_business_name",
        Filter: TableColumnFilter,
        Cell: ({ row }) =>  {
          return(
            <div>
              <h6>{row.values.invoice_merchant_business_name}</h6>
              <p>{row.values.invoice_merchant_business_phone}</p>
            </div>
          )
        }
      },
      {
        Header: "Amount Collected",
        accessor: "invoice_total_collection_amount",
        Cell: ({ row }) => (<span>TK. {row.values.invoice_total_collection_amount}</span>),
        Filter: TableColumnFilter,
      },
      {
        Header: "Delivery Charges",
        accessor: "invoice_total_delivery_charge",
        Cell: ({ row }) => (<span>TK. {row.values.invoice_total_delivery_charge}</span>),
        Filter: TableColumnFilter,
      },
      {
        Header: "Payables",
        accessor: "invoice_total_payables",
        Cell: ({ row }) => (<span>TK. {row.values.invoice_total_payables}</span>),
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
        Filter: TableColumnFilterPaymentStatus,
      },
      {
        Header: "Merchant",
        accessor: "invoice_merchant_business_phone",
        Filter: TableColumnFilter,
      },
      {
        Header: "Action",
        accessor: "attributes.invoice_merchant_name",
        Filter: TableColumnFilter,
        Cell: ({row}) => {
          return (
            <div className="d-flex justify-content-start">
              <Link to={{pathname:`/admin/payment/${row.original._id}`}} className="action action-view me-2" id="View" alt="View" onClick={ () => setEditInvoice(`${row.original._id}`) }>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                  <path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor" />
                </svg>
              </Link>
              <button className="action action-update" onClick={() => handleUpdtate(`${row.original._id}`)}>
                <span className="text-uppercase fw-medium">Update</span>
              </button> 
            </div>
          )
        }
      }
    ],
    []
  );

  useEffect(() => {
  }, [])
  
  

  const initialState = { hiddenColumns: ['_id','merchant_business_phone'] };
  
  return (
    <>
      {/* Table */}
      <div className="table">
        {invoices ? 
          <ElementTable columns={columns} initialState={initialState} data={invoices}   filterCmponents={["search", "payment-status", "reset"]} />
          :
          <Loading />
        }
      </div>

      {/* Modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <FormInvoiceUpdate />
      </Modal>

    </>
  );
}

export default TableAdminAllInvoices