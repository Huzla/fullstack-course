import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handler }) => (
  <button onClick={ handler }>Next piece of wisdom</button>
)

const Anecdote = ({ str }) => (
  <h1>{ str }</h1>
);

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  //source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const getRandomIndex = () => {
    return Math.floor(Math.random() * (anecdotes.length));
  }

  const handleClick = () => {
    setSelected(getRandomIndex());
  }

  return (
    <>
      <Anecdote str={ anecdotes[selected] } />
      <Button handler={ handleClick } />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={ anecdotes } />,
  document.getElementById('root')
)
