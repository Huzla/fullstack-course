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
      .catch(errorHandler);

  }, []);

//----------------------------------------------------------------------------------------------------------------------------------

  const errorHandler = (err) => {
    alert(err.message);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  }

  const handleRemoval = person => {

    if (window.confirm(`Do you really want to remove ${person.name}`))
      serverInterface
        .removePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
        })
        .catch(errorHandler);
  }

  const personIsListed = (person) => persons.find(p => p.name === person.name);

  const addNewPerson = (newPerson) => {

    if (!personIsListed(newPerson))
      serverInterface
        .addPerson(newPerson)
        .then(people => {
          setNewName('');
          setNewNum('');

          setPersons(persons.concat(people));
        })
        .catch(errorHandler);
    else {
      alert(`${newPerson.name} has already been added to the phonebook!`);
    }
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
      <Content parts={ visibleNumbers } buttonHandler={ handleRemoval } />
    </div>
  )

}

export default App
