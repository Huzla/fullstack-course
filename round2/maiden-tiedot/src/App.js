import React, {useState, useEffect} from 'react';
import Search from './components/Search.js';
import Countries from './components/Countries.js';

function App() {
  const [newSearch, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const suitableCountries = (newSearch === '') ? countries : countries.filter(c => c.name.toUpperCase().includes(newSearch.toUpperCase()));
//-------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }




  return (
    <div className="App">
      <Search value={ newSearch } handler={ handleSearch }/>
      <Countries countries={ suitableCountries } />
    </div>
  );
}

export default App;
