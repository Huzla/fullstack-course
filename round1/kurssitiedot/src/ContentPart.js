import React from 'react';

class ContentPart extends React.Component {
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

export default ContentPart
