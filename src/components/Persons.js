import React from 'react';

const Persons = ({ persons }) => {
    const renderPersons = persons.map(p => (
        <div key={p.id}>
            {p.name}
        </div>
    ));
    return <div className="Persons">{renderPersons}</div>
}

export default Persons;
