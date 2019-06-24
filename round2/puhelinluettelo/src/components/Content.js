import React from 'react';
import Part from './Part.js';

const Content = ({parts, buttonHandler}) => {

  let result = parts.map((part) => <Part key={part.id} {...part} handler={ () => buttonHandler(part) }/>);

  return (result);
}

export default Content
