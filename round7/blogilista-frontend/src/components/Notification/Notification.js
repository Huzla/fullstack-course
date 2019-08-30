import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const Notification = ({ type, message }) => {

  if (!message || !type)
    return null;

  return (
    <Message positive={ type === "success" } negative={ type === "error" } data-test-notification={ type } >
      <Message.Header>
        { message }
      </Message.Header>
    </Message>
  );
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    type: state.notification.type,
    message: state.notification.message
  };
};

export default connect(
  mapStateToProps,
  null
)(Notification);
