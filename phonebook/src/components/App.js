import React, { useState, useEffect } from 'react';
import axios from 'axios';
import personService from '../services/person';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const getData = async () => {
      const data = await personService.getAll();
      setPersons(data);
    }
    getData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let confirmation;
    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      confirmation = window.confirm(`${newName} is already added to phonebook. do you want to replace it?`)
    }

    if (confirmation) {
      const person = persons.find(p => p.name === newName);
      const data = await personService.update(person.id, { name: newName, number: newNumber });
      setPersons(persons.map(p => person.id === p.id ? data : p));
    } else if (confirmation === undefined) {
      const data = await personService.create({ name: newName, number: newNumber });
      setPersons(persons.concat(data));
    }
    
    setNewName('');
    setNewNumber('');
    
  };

  const remove = (id) => {
    const confirmation = window.confirm(`Delete this person?`);
    if (confirmation) {
      personService.remove(id);
      const newPersons = persons.filter(p => p.id !== id);
      setPersons(newPersons);
    }
  }

  return (
    <div className='App'>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onSubmit={onSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} remove={remove} />
    </div>
  );
};

export default App;
