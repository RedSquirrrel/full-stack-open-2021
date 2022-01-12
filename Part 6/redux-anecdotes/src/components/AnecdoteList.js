import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voting } from './../reducers/anecdoteReducer';
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') return anecdotes;
    return filter ? anecdotes.filter(f => f.content.toLowerCase().indexOf(filter) >= 0) : '';
  });

  const vote = (id, content) => {
    dispatch(voting(id));
    dispatch(showNotification(`You voted: ${content}`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };
  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
    </div>
  );
};

export default Anecdotes;
