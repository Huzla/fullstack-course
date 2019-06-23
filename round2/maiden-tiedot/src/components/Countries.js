import React from 'react';
import Country from './Country';

const Countries = ({countries, handler, weather}) => {

  let result = "Too many matches. Please specify.";

  const renderFullCountry = (country) => {

    return <Country key={ country.name } handler={ handler } { ...country }/>;
  };

  const renderOneCountry = (country) => {
    let copy = Object.assign({}, country);
    copy.fullRender = null;
    copy.weather = weather;

    return renderFullCountry(copy);
  }


  if (countries.length < 10) {
    result = countries.map( (countries.length === 1) ? renderOneCountry : renderFullCountry);
  }

  return (
    <div id="countries">
      { result }
    </div>
  );
}

export default Countries
