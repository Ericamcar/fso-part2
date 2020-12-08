import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ searchName, setSearchName }) => {
  return (
    <>
      <label htmlFor={'search'}>filter shown with </label>
      <input
        type='text'
        name='search'
        id='search'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
    </>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  onSubmit,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name: </label>
        <input
          type='text'
          name='name'
          id='name'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <br />
        <label htmlFor={'number'}>Number: </label>
        <input
          type='tel'
          name='number'
          id='number'
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <button style={{ display: 'block' }} type='submit'>
          add
        </button>
      </form>
    </>
  );
};

const Persons = ({ persons, searchName }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
      setPersons(res.data);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  };

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
      <Persons persons={persons} searchName={searchName} />
    </div>
  );
};

export default App;
