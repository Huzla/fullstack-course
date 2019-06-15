import React from 'react';

class Part extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {


  }

  componentWillUnmount() {
  }

  render() {

    return (
      <>
      <p>{this.props.name} {this.props.exercises}</p>
      </>
    );
  }
}

export default Part
