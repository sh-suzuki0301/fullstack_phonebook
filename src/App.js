import React, { useState } from 'react';
import Person from '../src/components/Persons.js';
const App = () => { 
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
        }

        if (persons.some(p => p.name === newName)) {
            window.alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(newPerson));
            setNewName('');
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                            value={newName}
                            onChange={handleNameChange}
                            />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Person persons={persons} />  
        </div>
    )

}

export default App;