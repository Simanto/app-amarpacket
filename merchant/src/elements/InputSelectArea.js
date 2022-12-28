import React, { useEffect, useState } from "react";
import Select, { createFilter } from "react-select";


const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: 'none',
      color: state.isSelected ? '#E9BB2C' : '#76746D',
      padding: 10,

      '&:hover':{
        backgroundColor:'#F8F6EF',
        cursor: 'pointer'
      }
    }),
    control: base => ({
        ...base,
        backgroundColor:'#F8F6EF',
        borderColor: '#ced4da',
        borderRadius: '0.375rem',
        padding: '0.375rem',

        '&:hover':{
            borderColor: '#ced4da',
            boxShadow: 'none',
        },
        '&:active':{
            borderColor: '#ced4da',
            boxShadow: 'none',
        }
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
}


const InputSelectArea = ({options,name,defaultValue,placeholder,handleChange}) =>{
    const [lists, setLists] = useState(null);
    
    useEffect(() => {
        const areas = options.map((area,index) => ({
            "value" : index.toString(),
            "label" : area.toString()
        }))
        
        if(areas){
            setLists(areas);
        }
    }, [])
    
    return(
        <div className="dropdown-container">
            <Select
                styles={customStyles}
                name={name}
                options={lists}
                placeholder={placeholder}
                value={defaultValue}
                onChange={handleChange}
                isSearchable
                ignoreAccents
            />
        </div>
    );

}

export default InputSelectArea