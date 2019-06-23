import React from 'react';
import Country from './Country';

const Countries = ({countries}) => {

  let result = "Too many matches. Please specify.";

  const renderFullCountry = (country) => {
    return <Country key={ country.name } { ...country }/>;
  };

  const renderName = (country) => {
    return <Country key={ country.name } name={ country.name } />;
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
