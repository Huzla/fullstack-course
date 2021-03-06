import React from 'react';

const Form = ({handlers, values}) => {
  return (
    <form onSubmit={ handlers.handleSubmit }>
    <div>
      <label htmlFor="name">name: </label>
      <input name="name" value={ values.newName } onChange={ handlers.handleNameChange }/>

      <label htmlFor="number">number: </label>
      <input name="number" value={ values.newNum } onChange={ handlers.handleNumChange }/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  );
}

export default Form
