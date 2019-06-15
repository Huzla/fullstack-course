import React from 'react';
import Part from './Part.js';

class Content extends React.Component {

  render() {
    let result = [];

    this.props.parts.forEach((obj, index) => {
      result = result.concat(<Part key={index} name={obj.name} exercises={obj.exercises}/>);
    });

    return (result);
  }
}

export default Content
