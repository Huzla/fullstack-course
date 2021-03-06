import React from 'react';
import './css/Notification.css'
const Notification = ({type, message}) => {

  if (!message || !type)
    return null;

  return (
    <div id="notification" className={ type }>
      { message }
    </div>
  )
}

export default Notification
