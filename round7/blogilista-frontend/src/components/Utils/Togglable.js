import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Button,
  Segment,
  Icon
  } from "semantic-ui-react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Segment>
      <div style={ hideWhenVisible }>
        <Button basic icon color="black" onClick={ toggleVisibility }>
        <Icon name={ props.buttonLabel } />
        </Button>
      </div>

      <div style={ showWhenVisible }>
        <Segment>
          { props.children }
        </Segment>

        <Button basic icon negative onClick={ toggleVisibility }>
          <Icon name="cancel" />
        </Button>
      </div>
    </Segment>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
};

export default Togglable;
