import React, { useState, useEffect } from 'react'
import Content from './components/Content.js';
import Form from './components/Form.js';
import Search from './components/Search.js';
import Notification from './components/Notification.js';
import serverInterface from './services/serverInterface.js';

const App = () => {
  const [ persons, setPersons] = useState([]);


  const [ newSearch, setNewSearch ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ notification, setNotification ] = useState({});
  const [ notificationTimer, setNotificationTimer ] = useState();

  const visibleNumbers = (newSearch === '') ? persons : persons.filter(p => p.name.toUpperCase().includes(newSearch.toUpperCase()));

//-----------------------------------------------------------------------------------------------------------------------------------

  const showMessage = (type, message) => {
    setNotification({type, message});
    setNotificationTimer(setTimeout(clearMessage, 3000));
  }

  const clearMessage = () => {
    setNotificationTimer(clearTimeout(notificationTimer));
    setNotification({});
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
        successHandler(`Added ${person.name}!`);
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
        successHandler(`Changed ${person.name}'s number to ${person.number}'!`);
      })
      .catch(err => errorHandler(err, copy));
    }
  }

  const removeFromMemory = (person) => {
    setPersons(persons.filter(p => p.id !== person.id));
  }

//---------------------------------------------------------------------------------------------------------------------------------

  //Fetch data for initial render.
  useEffect(() => {

    serverInterface
      .getPeople()
      .then(peopleFromServer => setPersons(peopleFromServer))
      .catch(err => alert(`${err.message}\nPlease check your that the server is running.`));

  }, []);

//----------------------------------------------------------------------------------------------------------------------------------

  const errorHandler = (err, person) => {

    //Remove numbers that are no longer valid.
    if (err.message.includes('already removed'))
      removeFromMemory(person);

    showMessage("error", err.message);
  }

  const successHandler = (message) => {
    showMessage("success", message);
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
        .removePerson(person)
        .then(() => {
          removeFromMemory(person);
          successHandler(`Removed ${person.name}!`);
        })
        .catch(err => errorHandler(err, person));
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
      <Notification { ...notification }/>
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
