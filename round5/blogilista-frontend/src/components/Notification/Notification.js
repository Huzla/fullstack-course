import PropTypes from "prop-types";
import React from "react";
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

export default Notification;
