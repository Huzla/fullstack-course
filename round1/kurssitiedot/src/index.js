import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Content from './Content.js';
import Total from './Total.js';
import './index.css';
//import * as serviceWorker from './serviceWorker';

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
   name: 'Fundamentals of React',
   exercises: 10
  }
  const part2 = {
   name: 'Using props to pass data',
   exercises: 7
  }
  const part3 = {
   name: 'State of a component',
   exercises: 14
  }

  let allParts = {part1, part2, part3};

  return (
    //Note: ES6 and Babel required!
    <div>
      <Header course={course}/>
      <Content parts={allParts} />
      <Total parts={allParts} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
