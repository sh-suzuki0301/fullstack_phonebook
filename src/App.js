import React, { useState } from 'react';
import Person from '../src/components/Persons.js';
const App = () => { 
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number:'000-0000-0000'},
        { name: 'Bob Dyan', number:'111-1111-1111'},
        { name: 'Chris Holl', number:'222-2222-2222'},
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber,setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    const handleNameChange = event => setNewName(event.target.value);
    const handleNnmberChange = event => setNewNumber(event.target.value);
    const handleFilterChange = event => setNameFilter(event.target.value);

    const addPerson = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        if (persons.some(p => p.name === newName)) {
            window.alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('');
        };

    }

    const filter = persons => {
        return persons.filter(p =>
            p.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
    } 

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={nameFilter}>
                <div>
                    filter shown with: <input 
                                            value={nameFilter}
                                            onChange={handleFilterChange}
                                        />
                </div>
            </form>
            <h2>add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                            value={newName}
                            onChange={handleNameChange}
                            />
                </div>
                <div>
                    number: <input
                             value={newNumber}
                             onChange={handleNnmberChange}
                            />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Person persons={filter(persons)} />  
        </div>
    )

}

export default App;