import React from 'react';

const PersonForm = ({
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
    handleClick
}) => {
    return (
        <div className="PersonForm">
            <form>
                <div>
                    name:{" "}
                    <input type="text" defaultValue={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:{" "}
                    <input type="text" defaultValue={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button onClick={handleClick}>add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;