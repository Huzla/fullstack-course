import React from 'react';
import Part from './Part.js';

const Content = ({parts}) => {

  let result = parts.map((part) => <Part key={part.index} name={part.name} exercises={part.exercises}/>);

  return (result);
}

export default Content
