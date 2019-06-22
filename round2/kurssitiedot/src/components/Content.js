import React from 'react';
import Part from './Part.js';

const Content = ({parts}) => {

  let result = parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises}/>);

  return (result);
}

export default Content
