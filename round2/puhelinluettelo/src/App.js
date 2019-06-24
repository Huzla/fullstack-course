import React, { useState, useEffect } from 'react'
import Content from './components/Content.js';
import Form from './components/Form.js';
import Search from './components/Search.js';
import serverInterface from './services/serverInterface.js';

const App = () => {
  const [ persons, setPersons] = useState([]);


  const [ newSearch, setNewSearch ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');

  const visibleNumbers = (newSearch === '') ? persons : persons.filter(p => p.name.toUpperCase().includes(newSearch.toUpperCase()));

//---------------------------------------------------------------------------------------------------------------------------------

  //Fetch data for initial render.
  useEffect(() => {

    serverInterface
      .getPeople()
      .then(peopleFromServer => setPersons(peopleFromServer))
      .catch(function(err) {
        alert(`${err.message}\nPlease check that the test server is running.`);
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

  const addNewPerson = (newPerson) => {

    serverInterface
      .addPerson(newPerson)
      .then(people => {

        setNewName('');
        setNewNum('');

        setPersons(persons.concat(people));
      })
      .catch(err => {
        alert(err.message);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let newPerson = {
      name: newName,
      num: newNum
    };

    addNewPerson(newPerson);
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
