const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter;
    default:
      return state;
  }
};

export const filteredAnecdote = filter => {
  return {
    type: 'FILTER',
    filter,
  };
};

export default filterReducer;
