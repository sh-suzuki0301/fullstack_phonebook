import React, { useState } from 'react';
import Persons from '../src/components/Persons.js';
import Filter from '../src/components/Filter.js';
import PersonForm from '../src/components/PersonForm.js';


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
    const handleNumberChange = event => setNewNumber(event.target.value);
    const handleFilterChange = event => setNameFilter(event.target.value);

    const handleClick = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        if (persons.some(p => p.name === newName)) {
            window.alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(newPerson));
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
            <Filter value={nameFilter} handleChange={handleFilterChange}/>

            <h2>add a new</h2>
            <PersonForm 
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
                handleClick={handleClick}
            />
        
            <h2>Numbers</h2>
            <Persons persons={filter(persons)} />  
        </div>
    )

}

export default App;