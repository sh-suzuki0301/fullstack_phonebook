import React, { useState, useEffect } from 'react';
import Persons from '../src/components/Persons.js';
import Filter from '../src/components/Filter.js';
import PersonForm from '../src/components/PersonForm.js';
import presonsSrevise from './services/persons.module';

const { getData, deleteId, createPerson, updateId } = presonsSrevise;

const App = () => { 
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber,setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [notification, setNotification] = useState();

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

        const updatedPerson = await updateId(newPerson, id);
        if (updatedPerson.error) {
            setNotification({
                type: "error",
                message: updatedPerson.error
            });
            clearNotification();
        } else {
            setNotification({
                type: "success",
                message: `Updated ${newPerson.name}`
            });
            getPersons();
            clearNotification();
        }
        getData();
    };

    const clearNotification = () => {
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    const handleClick = async event => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        if (persons.some(p => p.name === newName)) {
            let id = persons.find(p => p.name === newName).id;
            try {
                await updatePerson(newPerson, id);
            } catch (error) {
                setNotification({
                    type: "error",
                    message: `Information of ${newPerson.name} has already been removed from server`
                });
                getPersons();
                clearNotification();
            }
        } else {
            try {
                const createdPerson = await createPerson(newPerson);
                if (createdPerson.error) {
                    console.log(createdPerson.error);
                    setNotification({
                        type: "error",
                        message: createdPerson.error
                    });
                } else {
                    setPersons(persons.concat(createdPerson));
                    setNotification({
                        type: "success",
                        message: `Add ${newPerson.name}`
                    });
                    clearNotification();
                }
            } catch (error) {
                console.error(error);
            }
        }

    };

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