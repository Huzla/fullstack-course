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
    //let promise = fetch('http://localhost:3001/all');
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
      setCountries(data.map(obj => {
        obj.fullRender = false;
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

  const handleButtonClick = (e) => {
    //TODO: Think of a better way to do this.
    let copy = [...countries ];
    let index = copy.findIndex(c => c.name === e.target.parentElement.firstChild.innerText );
    copy[index].fullRender = !copy[index].fullRender;

    setCountries(copy);
  }


  return (
    <div className="App">
      <Search value={ newSearch } handler={ handleSearch }/>
      <Countries handler={ handleButtonClick } countries={ exactMatch ? [exactMatch] : suitableCountries } />
    </div>
  );
}

export default App;
