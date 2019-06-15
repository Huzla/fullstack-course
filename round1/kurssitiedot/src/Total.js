import React from 'react';

class Total extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {

    return (
      <p>Number of exercises {this.props.exercises.reduce((total, next) => {return total + next}, 0)}</p>
    );
  }
}

export default Total
