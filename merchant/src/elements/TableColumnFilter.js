
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FormGroup, Input } from "reactstrap";
import { deliveryStatusOptions, paymentStatus } from '../assets/doc/options';
import { useAppContext } from '../context/appContext';
import InputSelect from './InputSelect';

export const TableColumnFilter = ({column}) => {
    const {filterValue, setFilter} = column
    return (
        <FormGroup className="mx-3 mt-2 mb-0 w-40" autoCapitalize="off">
            <Input
                id="search"
                name="search"
                placeholder="Search"
                type="text"
                onChange={(e) => setFilter(e.target.value)}
                value={filterValue || ""}
            />
            
        </FormGroup>
    )
}

export const TableColumnFilterPacketStatus = ({column}) => {
    const {filterValue, setFilter} = column;
    const {filter_packet_status, handleChange} = useAppContext()
    
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        handleChange({name, value})
    }

    useEffect(() => {
        setFilter(filter_packet_status)
    }, [filter_packet_status])
    
    return (
        <Input
            id="filter_packet_status"
            name="filter_packet_status"
            placeholder="Search"
            type="text"
            onChange={handleInputChange}
            value={filter_packet_status}
        />
    )
}

export const TableColumnFilterPacketStatusOptions = () =>{
    const {selected, setSelected} = useState(null);
    const { filter_packet_status,handleChange} = useAppContext()
    
    const handleSelect = (data) =>{
        handleChange({
            name: "filter_packet_status",
            value: data.value
        })
    }
    useEffect(() => {
            if(deliveryStatusOptions){
                deliveryStatusOptions.forEach((item)=>{
                    if(item.value === filter_packet_status){
                        setSelected(item);
                    }
                })
            }
    },[]);

    return(
         <InputSelect options={deliveryStatusOptions} value={selected} defaultValue={selected} placeholder="by Status" handleChange={handleSelect} />
    )
}

// Fileter: By Payment Status
export const TableColumnFilterPaymentStatusOptions = () =>{
    const {selected, setSelected} = useState(null);
    const { filter_packet_status,handleChange} = useAppContext()
    
    const handleSelect = (data) =>{
        handleChange({
            name: "filter_payment_status",
            value: data.value
        })
    }
    useEffect(() => {
            if(paymentStatus){
                paymentStatus.forEach((item)=>{
                    if(item.value === filter_packet_status){
                        setSelected(item);
                    }
                })
            }
    },[]);

    return(
         <InputSelect options={paymentStatus} value={selected} defaultValue={selected} placeholder="by Status" handleChange={handleSelect} />
    )
}
export const TableColumnFilterPaymentStatus = ({column}) => {
    const {filterValue, setFilter} = column;
    const {filter_payment_status, handleChange} = useAppContext()
    
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        handleChange({name, value})
    }

    useEffect(() => {
        setFilter(filter_payment_status)
    }, [filter_payment_status])
    
    return (
        <Input
            id="filter_payment_status"
            name="filter_payment_status"
            placeholder="Search"
            type="text"
            onChange={handleInputChange}
            value={filter_payment_status}
        />
    )
}

// filter_packet_delivery_man:"",
// filter_packet_merchant:"",

export const TableColumnFilterPacketPickupAgent = ({column}) => {
    const {filterValue, setFilter} = column;
    const {filter_packet_pickup_man, handleChange} = useAppContext()
    
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        handleChange({name, value})
    }

    useEffect(() => {
        setFilter(filter_packet_pickup_man)
    }, [filter_packet_pickup_man])
    
    return (
        <Input
            id="filter_packet_pickup_man"
            name="filter_packet_pickup_man"
            placeholder="Search"
            type="text"
            onChange={handleInputChange}
            value={filterValue}
        />
    )
}

export const TableColumnFilterPacketPickupOption = () =>{
    const {selected, setSelected} = useState();
    const { filter_packet_pickup_man,handleChange, allAgent} = useAppContext()
    
    const handleSelect = (data) =>{
        handleChange({
            name: "filter_packet_pickup_man",
            value: data.label
        })
    }
    useEffect(() => {
        if(allAgent){
            allAgent.forEach((item)=>{
                if(item.value === filter_packet_pickup_man){
                    setSelected(item);
                }
            })
        }

    },[]);

    return(
         <InputSelect options={allAgent} value={selected} defaultValue={selected} placeholder="by Pickup Agent" handleChange={handleSelect} />
    )
}


export const TableColumnFilterPacketDeliveryAgent = ({column}) => {
    const {filterValue, setFilter} = column;
    const {filter_packet_delivery_man, handleChange} = useAppContext()
    
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        handleChange({name, value})
    }

    useEffect(() => {
        setFilter(filter_packet_delivery_man)
    }, [filter_packet_delivery_man])
    
    return (
        <Input
            id="filter_packet_delivery_man"
            name="filter_packet_delivery_man"
            placeholder="Search"
            type="text"
            onChange={handleInputChange}
            value={filterValue}
        />
    )
}

export const TableColumnFilterPacketDeliveryOption = () =>{
    const {selected, setSelected} = useState();
    const { filter_packet_delivery_man,handleChange, allAgent} = useAppContext()
    
    const handleSelect = (data) =>{
        handleChange({
            name: "filter_packet_delivery_man",
            value: data.label
        })
    }
    useEffect(() => {
        if(allAgent){
            allAgent.forEach((item)=>{
                if(item.value === filter_packet_delivery_man){
                    setSelected(item);
                }
            })
        }

    },[]);

    return(
         <InputSelect options={allAgent} value={selected} defaultValue={selected} placeholder="by Delivery Agent" handleChange={handleSelect} />
    )
}


export const  dateBetweenFilterFn = (rows, id, filterValues) => {
    const sd = filterValues[0] ? new Date(filterValues[0]) : undefined
    const ed = filterValues[1] ? new Date(filterValues[1]) : undefined

    if (ed || sd) {
      return rows.filter(r => {
        const cellDate = new Date(r.values[id])

        if (ed && sd) {
          return cellDate >= sd && cellDate <= ed
        } else if (sd){
          return cellDate >= sd
        } else if (ed){
          return cellDate <= ed
        }
      })
    } else {
      return rows
    }
}
  
export const DateRangeColumnFilter = ({column: { filterValue = [], preFilteredRows, setFilter, id }}) => {
    const {filter_start_date, filter_end_date} = useAppContext();
    

    
    const setStartDate = (e) =>{
        const val = e.target.value
        setFilter((old = []) => [val ? val : undefined, old[1]])
    }

    const setEndDate = (e) => {
        const val = e.target.value
        setFilter((old = []) => [old[0], val ? val.concat('T23:59:59.999Z') : undefined])
    }

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)
        let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0)
    
        preFilteredRows.forEach(row => {
        const rowDate = new Date(row.values[id])
    
        min = rowDate <= min ? rowDate : min
        max = rowDate >= max ? rowDate : max
        })
    
        return [min, max]
    }, [id, preFilteredRows])

    useEffect(() => {
        if(filter_start_date && filter_end_date){
            setFilter((old = []) => [filter_start_date, old[1]])
            setFilter((old = []) => [old[0], filter_end_date])
        } 
    }, [filter_start_date,filter_end_date]) 

    return (
        <div className='d-flex'>
            <input
                min={min.toISOString().slice(0, 10)}
                onChange={setStartDate}
                type="date"
                value={filterValue[0] || ''}
            />
            {' to '}
            <input
            max={max.toISOString().slice(0, 10)}
            onChange={setEndDate}
            type="date"
            value={filterValue[1]?.slice(0, 10) || ''}
            />
      </div>
    );
}