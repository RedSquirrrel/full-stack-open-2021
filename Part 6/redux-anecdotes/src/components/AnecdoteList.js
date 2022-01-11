import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voting } from './../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = id => {
    dispatch(voting(id));
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
