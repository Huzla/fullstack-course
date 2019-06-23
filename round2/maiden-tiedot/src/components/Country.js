import React from 'react';
import BasicInfo from './BasicInfo.js';
import Languages from './Languages.js';
import Flag from './Flag.js';

const Country = (props) => {

  const basic = {Population: props.population, Capital: props.capital};
  const flag = {altText: `The flag of ${props.name}`, url: props.flag};

  return (
    <div className="country">
      <h2>{ props.name }</h2>
      <BasicInfo { ...basic }/>
      <Languages langs={ props.languages } />
      <Flag {...flag} />
    </div>
  );
}

export default Country
