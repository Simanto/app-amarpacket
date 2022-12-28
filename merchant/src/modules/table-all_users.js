import moment from "moment";
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import { useAppContext } from "../context/appContext";
import { ElementTable,Loading } from "../elements";
import { TableColumnFilter } from "../elements/TableColumnFilter";

const TableAllUsers = () =>{
  
  const {isLoading, allUser, adminAllUser, setEditUser} = useAppContext();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "userID",
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
        accessor: "user_fullname",
        Filter: TableColumnFilter,
      },
      {
        Header: "Phone",
        accessor: "user_phone",
        Filter: TableColumnFilter,
      },
      {
        Header: "Role",
        accessor: "user_role",
        Filter: TableColumnFilter,
        Cell: ({ row }) =>  <span className="text-capitalize">{row.values.user_role}</span>,
      },
      {
        Header: "Active",
        accessor: "user_isActive",
        Filter: TableColumnFilter,
        Cell: ({ row }) =>{
          return(
            <>
              {row.values.user_isActive === "true" ? <Badge color="success">Yes</Badge> : <Badge color="danger">No</Badge>}
            </>
          )
        }
      },
      {
        Header: "Action",
        accessor: "attributes.status",
        Filter: TableColumnFilter,
        Cell: ({row}) => {
          return (
            <div className="d-flex justify-content-start">
              <Link to={{pathname:`/admin/user/${row.original.userID}`}} className="action action-view me-2" id="View" alt="View" onClick={() => setEditUser(`${row.original.userID}`)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                  <path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="currentColor" />
                </svg>
              </Link>
              <Link to={{pathname:`/admin/user/edit/${row.original.userID}`}} className="action action-edit" onClick={ () => setEditUser(`${row.original.userID}`) }>
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
    adminAllUser()
  }, [])
  

  const initialState = { hiddenColumns: ['userID'] };
  
  return (
    <div className="table">
      {isLoading ? 
        <Loading />
        :
        <>
        {allUser &&
          <ElementTable columns={columns} initialState={initialState} data={allUser}   filterCmponents={["search"]}/>
        }
        </>
      }
    </div>
  );
}

export default TableAllUsers