import anecdotesService from '../services/anecdotes';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote)).sort((a, b) => b.votes - a.votes);
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdot = await anecdotesService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdot,
    });
  };
};

export const voting = (id, vote) => {
  return async dispatch => {
    const upd = await anecdotesService.update(id, vote + 1);
    dispatch({
      type: 'VOTE',
      data: upd,
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdot = await anecdotesService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdot,
    });
  };
};

export default reducer;
