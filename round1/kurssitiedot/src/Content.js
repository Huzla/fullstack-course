import React from 'react';
import Part from './Part.js';

class Content extends React.Component {

  render() {
    let result = [];

    for (let key in this.props.parts) {
      result = result.concat(<Part key={key} name={this.props.parts[key].name} exercises={this.props.parts[key].exercises}/>);
    }
    return (result);
  }
}

export default Content
