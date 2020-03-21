import React from 'react';

const Persons = ({ persons }) => {
    const renderPersons = persons.map((p, id) => (
        <div key={id}>
            {p.name} {p.number}
        </div>
    ));
    return <div className="Persons">{renderPersons}</div>
}

export default Persons;
