import React from 'react';

const Header = ({course, level}) => {

  //h1,h2,h3,h4,h5 or h6
  if ( ![...Array(5).keys()].map(i => i+1).includes(level)  )
    throw new Error('Invalid level!');

  const Tag = `h${level}`;

  return (
    <Tag>{course}</Tag>
  )
}


export default Header
