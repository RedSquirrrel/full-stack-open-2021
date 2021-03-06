const initialState = {
  text: '',
  styledType: '',
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return { ...state, text: action.text, styledType: action.styledType };
    case 'HIDE_NOTIFICATION':
      return action.data;

    default:
      return state;
  }
};

let timeoutId;

export const showNotification = (text, styledType, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      text,
      styledType,
    });

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        data: {
          text: '',
          styledType: '',
        },
      });
    }, time * 1000);
  };
};

export default notificationReducer;
