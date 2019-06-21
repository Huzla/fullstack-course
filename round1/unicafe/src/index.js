import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = () => (
  <header>
  <div id="logo">LOGO</div>
  <h1>Feedback is appreciated!</h1>
  <div className='divider'></div>
  </header>
);

const ControlPanel = () => {

}

const FeedbackOption = () => {

}

const StatsContainer = ({ stats }) => {
  let list = [];
  let index = 0;

  console.log(stats);

  for (let comment in stats) {
    list = list.concat(<StatElement key={index++} comment={comment} amount={stats[comment]}/>);
  }

  return (
    <ul>
      { list }
    </ul>
  )

}

const StatElement = ({comment, amount}) => (
  <li>
    <span className="comment">{ comment } </span>
    <span className="amount">{ amount } </span>
  </li>
)

const App = () => {

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <>
      <Header />
      <StatsContainer stats={{good, neutral, bad}}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
