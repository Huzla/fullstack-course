import React from 'react';

const Total = ({parts}) => {

    let sum = parts.map(part => part.exercises)
                          .reduce((total, next) => {return total + next}, 0);

    return (
      <p>So a total of <strong>{ sum }</strong> exercises</p>
    );
}

export default Total
