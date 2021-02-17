import React from 'react'

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

export default PersonForm;