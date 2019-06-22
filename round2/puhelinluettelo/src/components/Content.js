import React from 'react';
import Part from './Part.js';

const Content = ({parts}) => {

  let result = parts.map((part) => <Part key={part.name} name={part.name}/>);

  return (result);
}

export default Content
