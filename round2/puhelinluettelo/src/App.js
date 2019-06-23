import React, { useState, useEffect } from 'react'
import Content from './components/Content.js';
import Form from './components/Form.js';
import Search from './components/Search.js';

const App = () => {
  const [ persons, setPersons] = useState([]);


  const [ newSearch, setNewSearch ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');

  const visibleNumbers = (newSearch === '') ? persons : persons.filter(p => p.name.toUpperCase().includes(newSearch.toUpperCase()));

//---------------------------------------------------------------------------------------------------------------------------------

  //Fetch data for initial render.
  useEffect(() => {
    let promise = fetch('http://localhost:3001/persons');

    promise
    .catch(function(err) {
      alert(`${err.message}\nPlease check that the test server is running.`);
    });

    promise
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      setPersons(data);
    });
  }, []);

//----------------------------------------------------------------------------------------------------------------------------------


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let newPerson = {
      name: newName,
      num: newNum
    };

    setNewName('');
    setNewNum('');

    if (persons.find(p => p.name === newPerson.name)) {
      alert(`${newPerson.name} has already been added to the phonebook!`);
      return;
    }

    setPersons(persons.concat(newPerson));
  }

//-------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <h1>Phonebook</h1>
      <Search value={ newSearch } handler={ handleSearch } />
      <h2>Add new</h2>
      <Form handlers={ {handleSubmit, handleNumChange, handleNameChange} } values={ {newNum, newName} } />
      <h2>Numbers</h2>
      <Content parts={ visibleNumbers } />
    </div>
  )

}

export default App
