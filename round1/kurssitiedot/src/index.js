import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Content from './Content.js';
import Total from './Total.js';
import './index.css';
//import * as serviceWorker from './serviceWorker';

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    //Note: ES6 and Babel required!
    <div>
      <Header course={course}/>
      <Content exercisesPerPart = {{[part1]: exercises1, [part2]: exercises2, [part3]: exercises3}} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
