import React from 'react';
import BasicInfo from './BasicInfo.js';
import Languages from './Languages.js';
import Flag from './Flag.js';
import Button from './Button.js';

const Country = (props) => {

  let info = [];

  if (props.fullRender < 2) {
    info = info.concat(<Button key="button" text={ props.fullRender ? "Hide" : "Show" } handler={ props.handler } />);
  }

  if (props.fullRender > 0) {
    info = info.concat(<BasicInfo key="basic" Population={ props.population } Capital={ props.capital } />)
                .concat(<Languages key="langs" langs={ props.languages } />)
                .concat(<Flag key="flag" {...{altText: `The flag of ${props.name}`, url: props.flag}} />);
  }

  return (
    <div className="country">
      <h2>{ props.name }</h2>
      { info }
    </div>
  );
}

export default Country
