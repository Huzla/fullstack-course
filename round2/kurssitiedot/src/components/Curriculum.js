import React from 'react';
import Course from './Course.js';

const Curriculum = ({courses}) => {

  //index is fine here as this data does not change.
  let result = courses.map((course, index) => <Course key={index} course={course}/>);

  return (result);
}

export default Curriculum
