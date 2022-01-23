const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.text;
    default:
      return state;
  }
};

let timeoutId;
export const showNotification = (text, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      text,
    });

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        text: null,
      });
    }, time * 1000);
  };
};

export default notificationReducer;
