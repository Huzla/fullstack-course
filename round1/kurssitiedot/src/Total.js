import React from 'react';

class Total extends React.Component {

  render() {
    let exercises = [];

    for (let index in this.props.parts) {
      exercises = exercises.concat(this.props.parts[index].exercises);
    }
    return (
      <p>Number of exercises {exercises.reduce((total, next) => {return total + next}, 0)}</p>
    );
  }
}

export default Total
