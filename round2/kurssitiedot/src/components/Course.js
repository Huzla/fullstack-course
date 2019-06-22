import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import Total from './Total.js';

const Course = ({course}) => {

  return (
    < >
      <Header level={2} course={ course.name }/>
      <Content parts={ course.parts }/>
      <Total parts={ course.parts }/>
    < />
  )
}

export default Course
