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

  const resetInput = () => {
    setNewName('');
    setNewNum('');
  }

  const addNewPerson = (newPerson) => {
    let existingPerson = personIsListed(newPerson);

    if (!existingPerson)
      serverInterface
        .addPerson(newPerson)
        .then(person => {
          resetInput();

          setPersons(persons.concat(person));
        })
        .catch(errorHandler);
    else {
      let copy = {...existingPerson, number: newPerson.number};

      if (window.confirm(`${newPerson.name} has already been added to the phonebook!\nWould you like to replace their number with the new one?`))
        serverInterface
          .changeNumber(copy)
          .then(person => {
            resetInput();

            setPersons(persons.map(p => p.id !== person.id ? p : person));
          })
          .catch(errorHandler);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let newPerson = {
      name: newName,
      number: newNum
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
