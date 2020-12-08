import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const Search = ({ search, setSearch }) => {
  return (
    <>
      <label htmlFor='countrySearch'>Find countries: </label>
      <input
        type='text'
        name='countrySearch'
        id='countrySearch'
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
    </>
  );
};

const Country = ({ country, show }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>{country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt='' style={{ width: '200px' }} />
    </>
  );
};

const Countries = ({ countries }) => {
  const [show, setShow] = useState(new Array(countries.length).fill(false));

  const toggleShow = (i) => () => {
    let newShow = [...show];
    newShow[i] = !newShow[i];
    setShow(newShow);
  };

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return (
      <ul>
        {countries.map((country, i) => (
          <li key={country.name}>
            {country.name}{' '}
            <button onClick={toggleShow(i)}>{show[i] ? 'hide' : 'show'}</button>
            {show[i] && <Country country={country} />}
          </li>
        ))}
      </ul>
    );
  }
};

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((res) => setCountries(res.data));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search)
  );

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      {filteredCountries.length > 10 ? (
        <p>Too many searches, specify another filter</p>
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </>
  );
}

export default App;
