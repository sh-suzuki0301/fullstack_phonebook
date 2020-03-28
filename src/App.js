import React, { useState, useEffect } from 'react';
import Persons from '../src/components/Persons.js';
import Filter from '../src/components/Filter.js';
import PersonForm from '../src/components/PersonForm.js';
import axios from 'axios';
import presonsSrevise from './services/persons.module';

const { getData, deleteId, createPerson, updateId } = presonsSrevise;

const App = () => { 
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber,setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    const handleNameChange = event => setNewName(event.target.value);
    const handleNumberChange = event => setNewNumber(event.target.value);
    const handleFilterChange = event => setNameFilter(event.target.value);

    useEffect(() =>  {
        getPersons();
    },[]);

    const getPersons = async () => {
        setPersons(await getData());
    }

    const deletePerson = async ({ name, id}) => {
        window.confirm(`Delete ${name}?`);
        await deleteId(id);
        getPersons();
    }

    const updatePerson = async (newPerson, id) => {
        window.confirm(
            `${newPerson.name} is already added to phonebook,replace the old number with a new one?`
        );
        await updateId(newPerson, id);
        getData();
    };

    const handleClick = async event => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        if (persons.some(p => p.name === newName)) {
            let id = persons.find(p => p.name === newName).id;
            await updatePerson(newPerson, id);
            getPersons();
        } else {
            const createdPerson = await createPerson(newPerson);
            setPersons(persons.concat(createdPerson));
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
            <Persons persons={filter(persons)} handleDelete={deletePerson}/>  
        </div>
    )

}

export default App;