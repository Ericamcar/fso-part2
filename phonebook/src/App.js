import React, { useState } from 'react';

const Filter = ({ searchName, setSearchName }) => {
  return (
    <React.Fragment>
      <label htmlFor={'search'}>filter shown with </label>
      <input
        type='text'
        name='search'
        id='search'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
    </React.Fragment>
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
    <React.Fragment>
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
    </React.Fragment>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

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
