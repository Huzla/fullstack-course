import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Button,
  Segment,
  Icon,
  Transition
  } from "semantic-ui-react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Segment>
      <Transition visible={ visible } animation="slide down" duration={ 500 }>
        <Segment>
        { props.children }
        </Segment>
      </Transition>

      <Button negative={ visible } basic icon color="black" onClick={ toggleVisibility }>
        <Icon name={ (!visible) ? props.buttonLabel : "cancel" } />
      </Button>
    </Segment>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
};

export default Togglable;
