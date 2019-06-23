import React from 'react';
import BasicInfo from './BasicInfo.js';
import Languages from './Languages.js';
import Image from './Image.js';
import Button from './Button.js';
import Weather from './Weather.js';

const Country = (props) => {

  let info = [];

  if (props.fullRender === true || props.fullRender === false) {
    info = info.concat(<Button key="button" text={ props.fullRender ? "Hide" : "Show" } handler={ props.handler } />);
  }

  if (props.fullRender !== false) {

    info = info.concat(<BasicInfo key="basic" Population={ props.population } Capital={ props.capital } />);
    if (props.weather && props.weather.current) info = info.concat(<Weather key="weat" {...props.weather} />);

    info = info.concat(<Languages key="langs" langs={ props.languages } />)
               .concat(<Image key="flag" {...{altText: `The flag of ${props.name}`, url: props.flag}} />);



  }

  return (
    <div className="country">
      <h2>{ props.name }</h2>
      { info }
    </div>
  );
}

export default Country
