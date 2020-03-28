import React from 'react';

const Persons = ({ persons, handleDelete }) => {
    const renderPersons = persons.map((p) => (
        <div key={p.id}>
            {p.name} {p.number}
            <button onClick={() => handleDelete(p)}>delete</button>
        </div>
    ));
    return <div className="Persons">{renderPersons}</div>
}

export default Persons;
