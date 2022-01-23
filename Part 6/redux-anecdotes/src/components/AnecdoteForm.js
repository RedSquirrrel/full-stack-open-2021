import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = props => {
  const addAnecdote = async e => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    props.createAnecdote(content);
    props.showNotification(`Adedd: "${content}"`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: value => {
      dispatch(createAnecdote(value));
    },
    showNotification: (value, time) => {
      dispatch(showNotification(value, time));
    },
  };
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
