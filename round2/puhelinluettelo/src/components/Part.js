import React from 'react';

const Part = ({name, number, handler}) => (
  <>
  <p>{name} {number} <button onClick={ handler }>Remove</button></p>
  </>
)

export default Part
