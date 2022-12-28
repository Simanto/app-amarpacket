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
            Cell: ({ row }) =>  <span className='text-uppercase'>{row.values.invoice_packet_trackingID} </span>,
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
            Cell: ({ row }) =>  <span className='text-uppercase'>TK. {row.values.invoice_packet_collection_amount} </span>,
          },
          {
            Header: "Delivery Charge",
            accessor: "invoice_packet_delivery_charge",
            Filter: TableColumnFilter,
            Cell: ({ row }) =>  <span className='text-uppercase'>TK. {row.values.invoice_packet_delivery_charge} </span>,
          },
          {
            Header: "Amount Paid",
            accessor: "invoice_packet_payables",
            Filter: TableColumnFilter,
            Cell: ({ row }) =>  <span className='text-uppercase'>TK. {row.values.invoice_packet_payables} </span>,
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