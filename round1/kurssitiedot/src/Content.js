import React from 'react';
import Part from './Part.js';

class Content extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let result = [];

    for (let key in this.props.exercisesPerPart) {
      result.push(<Part name={key} exercises={this.props.exercisesPerPart[key]}/>);
    }
    return (result);
  }
}

export default Content
