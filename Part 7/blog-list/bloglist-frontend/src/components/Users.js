import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Users = () => {
  const users = useSelector(state => state.users);

  return (
    <div>
      <h1>Users</h1>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map(u => {
              return (
                <tr key={u.id}>
                  <td>
                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                  </td>
                  <td>{u.blogs.length} - Blogs</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
