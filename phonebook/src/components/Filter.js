import React from 'react'

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

export default Filter;