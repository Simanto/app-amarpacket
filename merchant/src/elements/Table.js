import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters, usePagination } from "react-table";
import { Button, Col, Input, Row, Table } from "reactstrap";
import TableFilter from "./TableFilter";
import { DateRangeColumnFilter, TableColumnFilterPacketDeliveryOption, TableColumnFilterPacketPickupOption, TableColumnFilterPacketStatusOptions } from "./TableColumnFilter";
import SelectDateRange from "./select-date_range";


const  ElementTable =({ initialState, columns, data, filterCmponents })=> {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups, 
        footerGroups,
        rows,
        // page, 
        // nextPage,
        // previousPage,
        // pageOptions,
        prepareRow,
        state,
        setGlobalFilter,
      } = useTable({
        initialState,
        autoResetGlobalFilter: false,
        autoResetFilters:false,
        columns,
        data,
    }, 
        useFilters,
        useGlobalFilter,
        usePagination
    );

    const {globalFilter} = state;

    const resetFilter = () =>{
        // resetFilterValues();
        window.location.reload();
    }

    return (
        <div>
            <div className="d-flex m-2 table-filter">
                    {filterCmponents.indexOf("search") !== -1 ?
                        <Col>
                            <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
                        </Col>
                        :
                        null
                    }
                    {filterCmponents.indexOf("date-range") !== -1 ?
                        <Col>
                            <SelectDateRange />
                        </Col>
                        :
                        null
                    }
                    {filterCmponents.indexOf("status") !== -1 ?
                        <Col>
                            <TableColumnFilterPacketStatusOptions />
                        </Col>
                        :
                        null
                    }
                    {filterCmponents.indexOf("pickup_agent") !== -1 ?
                        <Col>
                            <TableColumnFilterPacketPickupOption />
                        </Col>
                        :
                        null
                    }
                    {filterCmponents.indexOf("delivery_agent") !== -1 ?
                        <Col>
                            <TableColumnFilterPacketDeliveryOption />
                        </Col>
                        :
                        null
                    }
                    {filterCmponents.indexOf("status") !== -1 ||
                    filterCmponents.indexOf("date-range") !== -1 
                    ?
                        <Col>
                            <Button block color="danger" onClick={resetFilter}>
                                Reset
                            </Button>
                        </Col>
                        :
                        null
                    }
            </div>
                 
            <Table responsive {...getTableProps()}>
                {headerGroups.map((headerGroup,i) => (
                    <thead key={i}>
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column,i)=> (
                                <th {...column.getHeaderProps({
                                    style: { minWidth: column.minWidth, width: column.width },
                                })}>
                                    {column.render("Header")}
                                    {/* visually-hidden */}
                                    <div className="visually-hidden">
                                        {column.canFilter ? column.render("Filter") : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                )) 
                }
                <tbody {...getTableBodyProps()}>
                    {rows.length > 0 ? rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr key={i} {...row.getRowProps()}>
                                {row.cells.map((cell,i) => {
                                    return <td key={i} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })
                    :
                        <tr className="position-relative">
                            <td className="w-100 position-absolute text-center">No data found</td>
                        </tr>
                    }
                </tbody>
                
                {footerGroups ? 
                    <tfoot>
                        {footerGroups.map(group => (
                            <tr {...group.getFooterGroupProps()}>
                                {group.headers.map(column => (
                                    <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                                ))}
                        </tr>
                        ))}
                    </tfoot>
                    :
                    null
                }

            </Table>
            {/* <div>
                <button onClick={()=> previousPage()}>Prevoius</button>
                <button onClick={()=> nextPage()}>Next</button>
            </div> */}
        </div>
    );
}

export default ElementTable