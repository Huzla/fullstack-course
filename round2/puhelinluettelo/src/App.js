import React, { useState } from 'react'
import Content from './components/Content.js';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let newPerson = {
      name: newName
    };

    setNewName('');

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
          name: <input value={ newName } onChange={ handleNameChange }/>
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
