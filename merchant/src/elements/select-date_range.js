import React, { useEffect, useState } from 'react'
import { Input } from 'reactstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { useAppContext } from '../context/appContext.js';

const SelectDateRange = () => {
    const {filter_start_date, filter_end_date, handleChange} = useAppContext();
    
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const handleInput = (dates) => {

        const [start, end] = dates;

        setStartDate(start);
        setEndDate(end);

        
        handleChange({
            name: "filter_start_date",
            value: moment(start).format("YYYY-MM-DD") || "",
        })

        handleChange({
            name: "filter_end_date",
            value: moment(end).format("YYYY-MM-DD") || "",
        })
        
      };
    
    
    
    return (
    <div className='d-flex'>

        {/* <Input type='date' placeholder='start date' />
        to
        <Input type='date' placeholder='end date' /> */}
        <DatePicker
            className='form-control'
            selectsRange={true}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            placeholderText="start date - end date"
            onChange={handleInput}
            monthsShown={2}
            dateFormat="yyyy-MM-dd"
        />


    </div>
  )
}

export default SelectDateRange