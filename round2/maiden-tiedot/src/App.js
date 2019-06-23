import React, {useState, useEffect} from 'react';
import Search from './components/Search.js';
import Countries from './components/Countries.js';

function App() {
  const [newSearch, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const suitableCountries = (newSearch === '') ? countries : countries.filter(c => c.name.toUpperCase().includes(newSearch.toUpperCase()));
  const exactMatch = suitableCountries ? suitableCountries.find(c => c.name.toUpperCase() === newSearch.toUpperCase()) : null;

//-------------------------------------------------------------------------------------------------------
  //NOTE: json-server is also available.
  useEffect(() => {
    let promise = fetch('http://localhost:3001/all');

    promise
    .catch(function(err) {
      alert(`${err.message}`);
    });

    promise
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setCountries(data.map(obj => {
        obj.fullRender = 0;
        return obj;
      }));
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
