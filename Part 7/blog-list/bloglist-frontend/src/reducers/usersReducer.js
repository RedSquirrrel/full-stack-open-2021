import userServices from './../services/user';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'ALL_USERS':
      return action.data;

    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async dispatch => {
    const getAllUsers = await userServices.getAll();
    dispatch({
      type: 'ALL_USERS',
      data: getAllUsers,
    });
  };
};

export default userReducer;
