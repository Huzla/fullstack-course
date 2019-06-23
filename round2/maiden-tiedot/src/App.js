import React, {useState, useEffect} from 'react';
import Search from './components/Search.js';
import Countries from './components/Countries.js';

const App = () => {
  const [newSearch, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  const suitableCountries = (newSearch === '') ? countries : countries.filter(c => c.name.toUpperCase().includes(newSearch.toUpperCase()));
  const oneMatch = suitableCountries.length === 1 ? suitableCountries[0] : suitableCountries.find(c => c.name.toUpperCase() === newSearch.toUpperCase());

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

    if (oneMatch) {
      let country = oneMatch;

      //Please don't steal my API key
      let apiUrl = `https://api.apixu.com/v1/current.json?key=d2cb37b32d0d435f8d9131411192306&q=${country.capital}`;

      let promise = fetch(apiUrl);
      promise
      .catch(function(err) {
        alert(`${err.message}`);
      });

      promise
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        setWeatherData(data);
      });
    }

  }, [oneMatch])

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
      <Countries handler={ handleButtonClick } countries={ oneMatch ? [oneMatch] : suitableCountries } weather={ weatherData } />
    </div>
  );
}

export default App;
