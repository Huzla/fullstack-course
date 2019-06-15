import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {


  }

  componentWillUnmount() {
  }

  render() {

    return (
      <h1>{this.props.course}</h1>
    );
  }
}

export default Header
