import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';

const Notification = () => {
  const message = useSelector(state => state.notification.text);
  const styledType = useSelector(state => state.notification.styledType);
  if (!message) return null;

  return <div className={styledType}>{message}</div>;
};

// Notification.propTypes = {
//   message: PropTypes.string.isRequired,
//   checker: PropTypes.bool.isRequired,
// };

export default Notification;
