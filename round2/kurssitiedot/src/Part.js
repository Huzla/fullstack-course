import React from 'react';

class Part extends React.Component {

  render() {

    return (
      <>
      <p>{this.props.name} {this.props.exercises}</p>
      </>
    );
  }
}

export default Part
