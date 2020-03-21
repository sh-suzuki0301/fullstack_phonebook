import React from 'react';

const Filter = ({value, handleChange}) => {
    return (
        <div className="Filter">
            <div>filter shown with</div>
            <input defaultValue={value} onChange={handleChange}/>
        </div>
    );
} ;

export default Filter;