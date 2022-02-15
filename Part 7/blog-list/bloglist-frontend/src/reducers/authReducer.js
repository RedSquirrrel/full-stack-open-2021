import blogsServices from '../services/blogs';
import loginServices from '../services/login';
import storage from '../utlis/storage';
import { showNotification } from './notificationReducer';

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOAD_USER':
      return action.data;

    case 'LOGIN':
      return action.data;

    case 'LOG_OUT':
      return action.data;

    default:
      return state;
  }
};

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginServices.login({ username, password });
      storage.saveUser(user);
      blogsServices.getConfig().headers.Authorization;
      dispatch({
        type: 'LOGIN',
        data: user,
      });

      dispatch(showNotification(`Welcome, ${username}`, 'success', 2));
    } catch (extention) {
      dispatch(showNotification('Wrong username or password', 'error', 2));
    }
  };
};

export const loadUser = () => {
  return async dispatch => {
    const user = await storage.loadUser();
    dispatch({
      type: 'LOAD_USER',
      data: user,
    });
  };
};

export const logOut = () => {
  return async dispatch => {
    const user = storage.logoutUser();
    dispatch({
      type: 'LOG_OUT',
      data: user,
    });
  };
};

export default authReducer;
