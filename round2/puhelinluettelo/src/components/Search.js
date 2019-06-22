import React from 'react';

const Search = ({handler, value}) => {
  return (
    < >
      <label htmlFor="search">Filter based on name: </label>
      <input name="search" value={ value } onChange={ handler }/>
    < />
  );
}

export default Search
