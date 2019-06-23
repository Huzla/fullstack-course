import React, {useState, useEffect} from 'react';
import Search from './components/Search.js';
import Countries from './components/Countries.js';

function App() {
  const [newSearch, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const suitableCountries = (newSearch === '') ? countries : countries.filter(c => c.name.toUpperCase().includes(newSearch.toUpperCase()));
  const exactMatch = suitableCountries.find(c => c.name.toUpperCase() === newSearch.toUpperCase());

//-------------------------------------------------------------------------------------------------------

  useEffect(() => {
    let promise = fetch('https://restcountries.eu/rest/v2/all');

    promise
    .catch(function(err) {
      alert(`${err.message}`);
    });

    promise
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setCountries(data);
    });
  }, []);

  useEffect(() => {

  }, [countries])

//------------------------------------------------------------------------------------------------------

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }




  return (
    <div className="App">
      <Search value={ newSearch } handler={ handleSearch }/>
      <Countries countries={ exactMatch ? [exactMatch] : suitableCountries } />
    </div>
  );
}

export default App;
