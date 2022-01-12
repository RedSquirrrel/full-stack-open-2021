import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnedoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnedoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
