import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route, Link
} from "react-router-dom";
import About from "./components/About.js";
import Anecdote from "./components/Anecdote.js";
import AnecdoteList from "./components/AnecdoteList.js";
import CreateNew from "./components/CreateNew.js";
import Footer from "./components/Footer.js";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1"
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2"
    }
  ]);

  const [notification, setNotification] = useState("");
  const [timer, setTimer] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimer(clearTimeout(timer));
    setTimer(setTimeout(() => setNotification(''), 10000));
  };

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    showNotification(`a new anecdote '${ anecdote.content }' created!`);
  };

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id);

    const padding = {
      paddingRight: 5
    };

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <Router>
          <div>
            <div>
              <Link style={ padding } to="/">anecdotes</Link>
              <Link style={ padding } to="/new">create new</Link>
              <Link style={ padding } to="/about">about</Link>
            </div>
            <h4>{ notification }</h4>
            <Route exact path="/" render={ () => <AnecdoteList anecdotes={ anecdotes } /> } />
            <Route exact path="/anecdotes/:id" render={ ({ match }) => <Anecdote anecdote={ anecdotes.find(anec => Number(anec.id) === Number(match.params.id)) }/> }/>
            <Route path="/new" render={ () => <CreateNew addNew={ addNew } /> } />
            <Route path="/about" render={ () => <About /> } />
          </div>
        </Router>
      </div>
      <div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
