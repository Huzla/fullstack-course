import React, { useState } from 'react'
import Content from './components/Content.js';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', num: "040123567" }
  ])
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="name">name: </label>
          <input name="name" value={ newName } onChange={ handleNameChange }/>

          <label htmlFor="number">number: </label>
          <input name="number" value={ newNum } onChange={ handleNumChange }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Content parts={ persons } />
    </div>
  )

}

export default App
