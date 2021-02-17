import React from 'react'

const Persons = ({ persons, searchName, remove }) => {
    return (
      <ul>
        {persons
          .filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
          .map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
              <button onClick={() => remove(person.id)}>delete</button>
            </li>
          ))}
      </ul>
    );
};

export default Persons;
