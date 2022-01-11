import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnedoteList from './components/AnecdoteList';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnedoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
