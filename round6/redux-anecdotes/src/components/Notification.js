import React from "react";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: (notification) ? "block" : "none"
  };

  return (
    <div style={ style }>
      { notification }
    </div>
  );
};

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    notification: state.notification
  };
};

export default connect(
  mapStateToProps,
  null
)(Notification);
