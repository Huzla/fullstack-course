import React from 'react';

class Total extends React.Component {

  render() {
    let exercises = [];

    for (let key in this.props.parts) {
      exercises = exercises.concat(this.props.parts[key].exercises);
    }
    return (
      <p>Number of exercises {exercises.reduce((total, next) => {return total + next}, 0)}</p>
    );
  }
}

export default Total
