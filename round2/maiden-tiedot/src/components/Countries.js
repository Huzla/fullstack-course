import React from 'react';
import Country from './Country';

const Countries = ({countries}) => {

  let result = "Too many matches. Please specify.";

  const renderFullCountry = (country) => {
    let copy = country;
    copy.fullRender = 2;

    return <Country key={ copy.name } { ...copy }/>;
  };

  const renderName = (country) => {
    if (country.fullRender)
      return renderFullCountry(country);

    return <Country key={ country.name }  name={ country.name } />;
  };

  if (countries.length < 10) {
    result = countries.map( (countries.length === 1) ? renderFullCountry : renderName);
  }

  return (
    <div id="countries">
      { result }
    </div>
  );
}

export default Countries
