import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const users = useSelector(state => state.users);

  const id = useParams().id;

  if (!users) {
    return null;
  }

  const user = users.find(u => u.id === id);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Added blogs</p>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title} </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
