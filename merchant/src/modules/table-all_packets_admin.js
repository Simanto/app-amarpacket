// import { data } from "autoprefixer";
import moment from "moment";
import { Fragment, useState } from "react";
import { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Modal, } from "reactstrap";
import { deliveryStatusOptions } from "../assets/doc/options";
import { useAppContext } from "../context/appContext";
import { ElementTable,InputSelect,Loading } from "../elements";
import { DateRangeColumnFilter, TableColumnFilter, TableColumnFilterPacketDeliveryAgent, TableColumnFilterPacketPickupAgent, TableColumnFilterPacketStatus, dateBetweenFilterFn } from "../elements/TableColumnFilter.js";
import FormPacketUpdate from "./form-packet_update";



const TableAdminAllPackets = () =>{
  const {getPacket,setEditPacket,getAllPacketAdmin,allPackets,isLoading,getAllAgent} = useAppContext();
  const [modal, setModal] = useState(false);
  
  const toggle = () => setModal(!modal);

  const handleUpdtate = (id) =>{
    setEditPacket(id);
    toggle();
  }

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
        width: 150,
        Filter: TableColumnFilter,
        Cell: ({ row }) =>  moment(row.values.packet_createdAt).utc().format("MMM D, YY"),
      },
      {
        Header: "Tracking & Order ID",
        accessor: "packet_trackingID",
        Filter: TableColumnFilter,
        width: 200,
        Cell: ({ row }) => (
          <>
            <p className="text-small mb-1">TID: <span  className="text-uppercase">{row.values.packet_trackingID}</span></p>
            <p className="text-small">OID: <span  className="text-uppercase">{row.values.packet_merchantInvoice}</span></p>
          </>
        ),
      },
      {
        Header: "Merchant ID",
        accessor: "packet_merchantInvoice",
        Filter: TableColumnFilter,
      },
      {
        Header: "Customer",
        accessor: "packet_customerName",
        Filter: TableColumnFilter,
        width: 300,
        Cell: ({row}) => (
          <Fragment>
            <p className="mb-1 fw-semibold">{row.values.packet_customerName}</p>
            <p className="mb-1">{row.values.packet_customerPhone}</p>
            <p className="mb-0">{row.values.packet_customerArea}</p>
            <p>{row.values.packet_customerAddress}</p>
          </Fragment>
        ),
      },
      {
        Header: "Merchant",
        accessor: "packet_merchant",
        Filter: TableColumnFilter,
        width: 200,
        Cell: ({row}) => (
          <Fragment>
            <p className="mb-1 fw-semibold">{row.values.packet_merchant}</p>
            <p className="mb-1">{row.values.packet_pcikup_area}</p>
          </Fragment>
        ),
      },
      {
        Header: "Pickup Area",
        accessor: "packet_pcikup_area",
        Filter: TableColumnFilter,
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
        Header: "Area",
        accessor: "packet_customerArea",
        Filter: TableColumnFilter,
      },
      {
        Header: "Status Category",
        accessor: "packet_status_category",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (
          <>
            <span className={"status status-"+row.values.packet_status_category}>{row.values.packet_status_category}</span>
          </>
        ),
      },
      {
        Header: "Status",
        accessor: "packet_status",
        Filter: TableColumnFilterPacketStatus,
        width: 300,
        Cell: ({ row }) => (
          <>
            <span className={"text-uppercase status alert alert-"+row.values.packet_status_category}>{row.values.packet_status}</span>
            {/* <p className="mt-2">Updated: {moment(row.values.packet_updatedAt).utc().format("MMM D, YY")}</p> */}
          </>
        ),
      },
      {
        Header: "Update Date",
        accessor: "packet_updatedAt",
        width: 150,
        Filter: DateRangeColumnFilter,
        filter: dateBetweenFilterFn,
        Cell: ({ row }) =>  moment(row.values.packet_updatedAt).utc().format("MMM D, YY"),
      },
      {
        Header: "Pickup Man",
        accessor: "packet_pickup_man",
        Filter: TableColumnFilterPacketPickupAgent,
      },
      {
        Header: "Delivery Man",
        accessor: "packet_delivery_man",
        Filter: TableColumnFilterPacketDeliveryAgent,
      },
      {
        Header: "Amount",
        accessor: "packet_collectionAmount",
        Filter: TableColumnFilter,
        Cell: ({ row }) => (<span>TK. {row.values.packet_collectionAmount}</span>),
        Footer: (info) => {
          const total = useMemo(
            () => info.rows.reduce(
              (sum, row) => 
                parseInt(row.values.packet_collectionAmount) + parseInt(sum), 0
            ),[info.rows]
          );
          return <span className="fw-medium text-dark">TK. {total}</span>
        }
  
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
        width: 200,
        Cell: ({row}) => {
          return (
            <Fragment>
              <div className="d-flex justify-content-start mb-2">
                <Link to={{pathname:'/packets/'+`${row.original.packetID}`} } className="action action-view me-2" id="View" alt="View" onClick={ () => getPacket(`${row.original.packetID}`) }>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                    <path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor" />
                  </svg>
                </Link>
                <Link to={{pathname:'/packets/edit/'+`${row.original.packetID}`}} className="action action-edit" onClick={ () => setEditPacket(`${row.original.packetID}`) }>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" fill="currentColor" />
                  </svg>
                </Link> 
              </div>
              <button className="action action-update" onClick={() => handleUpdtate(`${row.original.packetID}`)}>
                <span className="fw-medium">Update</span>
              </button> 
            </Fragment>
          )
        }
      }
    ],
    []
    );
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    getAllPacketAdmin();
    getAllAgent();
  }, []);
  

    const initialState = { hiddenColumns: ['packetID','packet_customerPhone', 'packet_customerAddress', "packet_pcikup_area","packet_merchantInvoice", "packet_customerArea","packet_status_category" ] };
  
    return (
      <div className="table">
          <ElementTable columns={columns} initialState={initialState} data={allPackets} filterCmponents={["search", "status", "pickup_agent", "delivery_agent", "date-range"]} />

        <Modal isOpen={modal} toggle={toggle}>
          <FormPacketUpdate />
        </Modal>

      </div>
    );
}

export default TableAdminAllPackets