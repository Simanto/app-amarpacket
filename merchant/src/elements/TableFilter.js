import React, { useEffect, useState } from 'react'
import { Input, InputGroup, InputGroupText } from "reactstrap";
import { useAppContext } from '../context/appContext';
import { useAsyncDebounce } from 'react-table';

const TableFilter = ({filter, setFilter}) => {
    const [value, setValue] = useState(filter);
    const {filter_global_search, handleChange} = useAppContext();

    const handleInputChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
      }, 1000);
    
  return (
    <InputGroup>
        <InputGroupText>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="#76746D" />
            </svg>
        </InputGroupText>
        <Input
            id="filter_global_search"
            name="filter_global_search"
            placeholder="Search"
            type="text"
            value={value || ""}
            onChange={(e) => {
                setValue(e.target.value);
                handleInputChange(e.target.value);
            }}
        />
    </InputGroup>
  )
}

export default TableFilter