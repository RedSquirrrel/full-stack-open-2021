const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const showNotification = notification => {
  return {
    type: 'SHOW_NOTIFICATION',
    notification,
  };
};

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  };
};

export default notificationReducer;
