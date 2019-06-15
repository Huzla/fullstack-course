import React from 'react';
import ContentPart from './ContentPart.js';

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
      result.push(<ContentPart name={key} exercises={this.props.exercisesPerPart[key]}/>);
    }
    return (result);
  }
}

export default Content
