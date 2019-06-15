import React from 'react';

class Total extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  arraySum(total, next) {
    //Note: Only works correctly with integers!
    return total + next;
  }

  render() {

    return (
      <p>Number of exercises {this.props.exercises.reduce(this.arraySum, 0)}</p>
    );
  }
}

export default Total
