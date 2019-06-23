import React from 'react';
import Country from './Country';

const Countries = ({countries}) => {



  return (
    <div id="countries">
      { countries.length }
    </div>
  );
}

export default Countries
