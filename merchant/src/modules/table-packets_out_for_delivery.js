import moment from "moment";
import { Fragment } from "react";
import { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext.js";
import { ElementTable,Loading,TableColumnFilter } from "../elements";

const TableMerchantOutForDelivery = () =>{

  const {getPacket,setEditPacket,packetsForDelivery, packetOutForDelivery} = useAppContext();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "packetID",
        Filter: TableColumnFilter,
      },
      {
        Header: "Order Date",
        accessor: "packet_createdAt",
        Filter: TableColumnFilter,
        Cell: ({ row }) =>  moment(row.values.packet_createdAt).utc().format("MMM D, YY"),
      },
      {
        Header: "Tracking ID",
        accessor: "packet_trackingID",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none">Tracking ID</p><span className="text-uppercase table-td_tracking-id">{row.values.packet_trackingID}</span></>),
      },
      {
        Header: "Customer",
        accessor: "packet_customerName",
        Filter: TableColumnFilter,
        width: 400,
        Cell: ({row}) => (
          <Fragment>
            <p className="mb-1 fw-semibold">{row.values.packet_customerName}</p>
            <p className="mb-1">{row.values.packet_customerPhone}</p>
            <p>{row.values.packet_customerAddress}</p>
          </Fragment>
        ),
      },
      {
        Header: "Phone",
        accessor: "packet_customerPhone",
        Filter: TableColumnFilter,
      },
      {
        Header: "Address",
        accessor: "packet_customerAddress",
        Filter: TableColumnFilter,
      },
      {
        Header: "Order ID",
        accessor: "packet_merchantInvoice",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none">Order ID</p><span className="text-uppercase table-td_order-id">{row.values.packet_merchantInvoice}</span></>),
      },
      {
        Header: "Status Category",
        accessor: "packet_status_category",
        Filter: TableColumnFilter,
      },
      {
        Header: "Status",
        accessor: "packet_status",
        Filter: TableColumnFilter,
        width: 300,
        Cell: ({ row }) => (<span className={"text-uppercase status alert alert-"+row.values.packet_status_category}>{row.values.packet_status}</span>),
      },
      {
        Header: "Collection Amount",
        accessor: "packet_collectionAmount",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (<span>TK. {row.values.packet_collectionAmount}</span>)
      },
      {
        Header: "Payment Status",
        accessor: "packet_paymentStatus",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (
          <>
            <span className={"text-uppercase status alert alert-info"}>{row.values.packet_paymentStatus}</span>
          </>
        ),
      },
      {
        Header: "Action",
        accessor: "attributes.packet_status",
        Filter: TableColumnFilter,
        Cell: ({row}) => {
          return (
            <Fragment>
              <div className="d-flex justify-content-start">
                <Link to={{pathname:'/packets/'+`${row.original.packetID}`} } className="action action-view" id="View" alt="View" onClick={ () => getPacket(`${row.original.packetID}`) }>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                    <path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor" />
                  </svg>
                  <span className="d-block d-sm-none fw-medium">VIEW</span>
                </Link>
              </div>
            </Fragment>
          )
        }
      }
    ],
    []
    );
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {

    packetOutForDelivery();
  }, []);
  

    const initialState = { hiddenColumns: ['packetID','packet_customerPhone', 'packet_customerAddress','packet_status_category' ] };
  
    return (
      <div className="table">
        {packetsForDelivery ? 
            <ElementTable columns={columns} initialState={initialState} data={packetsForDelivery} filterCmponents={["search"]} />
            :
            <Loading />
          }
      </div>
    );
}

export default TableMerchantOutForDelivery