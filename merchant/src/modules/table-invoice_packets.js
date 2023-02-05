import React, { useMemo, useEffect } from 'react'
import moment from "moment";
import { useAppContext } from "../context/appContext.js";
import { ElementTable,Loading,TableColumnFilter } from "../elements";

const TableInvoicePackets = () => {
    const {invoice_packets} = useAppContext();
    const columns = useMemo(
        () => [
          {
            Header: "ID",
            accessor: "invoice_packetID",
            Filter: TableColumnFilter,
          },
          {
            Header: "Date",
            accessor: "invoice_packet_createdAt",
            Filter: TableColumnFilter,
            Cell: ({ row }) =>  moment(row.values.invoice_packet_createdAt).utc().format("MMM D, YY"),
          },
          {
            Header: "Packets ID",
            accessor: "invoice_packet_trackingID",
            Filter: TableColumnFilter,
            Cell: ({ row }) =>  (<><p className="mb-1 d-block d-sm-none text-secondary">Invoice ID</p><span className="text-uppercase fw-medium"> {row.values.invoice_packet_trackingID} </span></>),
          },
          {
            Header: "Customer Name",
            accessor: "invoice_packet_customer_name",
            Filter: TableColumnFilter,
          },
          {
            Header: "Phone",
            accessor: "invoice_packet_customer_phone",
            Filter: TableColumnFilter,
          },
          {
            Header: "Amount Collected",
            accessor: "invoice_packet_collection_amount",
            Filter: TableColumnFilter,
            Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none text-secondary">Collected</p><span className='fw-medium text-secondary'>TK. {row.values.invoice_packet_collection_amount}</span></>),
          },
          {
            Header: "Delivery Charge",
            accessor: "invoice_packet_delivery_charge",
            Filter: TableColumnFilter,
            Cell: ({ row }) => (<><p className="mb-1 d-block d-sm-none text-danger">Cahrges</p><span className='fw-medium text-danger'>TK. {row.values.invoice_packet_delivery_charge}</span></>),
          },
          {
            Header: "Amount Paid",
            accessor: "invoice_packet_payables",
            Filter: TableColumnFilter,
            Cell: ({ row }) =>  (<><p className="mb-1 d-block d-sm-none text-success">Recieved</p><span className='fw-medium text-success'>TK. {row.values.invoice_packet_payables}</span></>),
            Footer: (info) => {
                const total = useMemo(
                  () => info.rows.reduce(
                    (sum, row) => 
                      parseInt(row.values.invoice_packet_payables) + parseInt(sum), 0
                  ),[info.rows]
                );
                return <span className="fw-medium text-dark">TK. {total}</span>
            }
          },
        ],
        []
    );

    const initialState = { hiddenColumns: ['invoice_packetID'] };
  return (
    <div>
        {invoice_packets ? 
          <ElementTable columns={columns} initialState={initialState} data={invoice_packets}   filterCmponents={["none"]} />
          :
          <Loading />
        }
    </div>
  )
}

export default TableInvoicePackets