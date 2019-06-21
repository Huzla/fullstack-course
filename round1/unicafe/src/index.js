import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = () => (
  <header>
  <h1>Feedback is appreciated!</h1>
  <div class='divider'></div>
  </header>
);

const App = () => {

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header />
      code here
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
