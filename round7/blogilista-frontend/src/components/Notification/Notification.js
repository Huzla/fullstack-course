import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./css/Notification.css";

const Notification = ({ type, message }) => {

  if (!message || !type)
    return null;

  return (
    <div id="notification" className={ type }>
      { message }
    </div>
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
