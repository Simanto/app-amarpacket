import React, { useState } from "react";
import Select from "react-select";


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

const InputSelectCity = () =>{
    // React state to manage selected options
    const [selectedOptions, setSelectedOptions] = useState();

    // Array of all options
    const optionList = [
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
        { value: "blue", label: "Blue" },
        { value: "white", label: "White" }
    ];

    // Function triggered on selection
    const handleSelect = (data) => {
        setSelectedOptions(data);
    }

    return(
        <div className="dropdown-container">
            <Select
                styles={customStyles}
                options={optionList}
                placeholder="Select City"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
            />
        </div>
    );

}

export default InputSelectCity
