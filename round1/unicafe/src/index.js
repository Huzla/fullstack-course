import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = () => (
  <header>
  <div id="logo">LOGO</div>
  <h1>Feedback is appreciated!</h1>
  <div className='divider'></div>
  </header>
);

const ControlPanel = ( {options} ) => {
  let list = [];
  let index = 0;


  for (let name in options) {
    list = list.concat(<FeedbackOption key={index++} name={name} handleClick={options[name]}/>);
  }

  return (
    <div id="ControlPanel">
      { list }
    </div>
  )
}

const FeedbackOption = ({name, handleClick}) => (
  <button className="option" onClick={ handleClick }>{ name }</button>
)

const StatsContainer = ({ stats }) => {
  if (!stats.all)
    return (
      <h2>Be the first to give feedback!</h2>
    )

  let list = [];
  let index = 0;


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
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAvg] = useState(0.0);
  const [positive, setPos] = useState('0%');

  const handlerBuilder = (value, func) => {
    return () => {
      func(value + 1);
      setAll(all + 1);
    };
  }

  useEffect(() => {
    if (all > 0) {
      setAvg((good - bad)/all);
      setPos((good)/all*100 + '%');
    }
  }, [all, good, bad]);

 const handlers = {"good": handlerBuilder(good, setGood),
                  "neutral": handlerBuilder(neutral, setNeutral),
                  "bad": handlerBuilder(bad, setBad)
                  };

  return (
    <>
      <Header />
      <ControlPanel options={ handlers }/>
      <StatsContainer stats={{good, neutral, bad, all, average, positive}}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
