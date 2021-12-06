import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, checker }) => {
  if (message === null) return;

  return <div className={checker ? ' success' : ' error'}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  checker: PropTypes.bool.isRequired,
};

export default Notification;
