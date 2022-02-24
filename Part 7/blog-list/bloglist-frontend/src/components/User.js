import React from 'react';

import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

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
      <Table>
        <tbody>
          {user.blogs.length ? (
            user.blogs.map(b => {
              return (
                <tr key={b.id}>
                  <td>
                    <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className='h4 text-primary'>No blogs saved yet </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
