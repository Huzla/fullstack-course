import React from 'react';
import Header from './Header.js';
import Content from './Content.js';

const Course = ({course}) => {

  return (
    < >
      <Header course={ course.name }/>
      <Content parts={ course.parts }/>
    < />
  )
}

export default Course
