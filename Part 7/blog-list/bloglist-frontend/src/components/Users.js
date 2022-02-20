import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector(state => state.users);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <td> </td>
            <th>Blogs created</th>
          </tr>
          <tr>
            <td>
              <table>
                <tbody>
                  {users &&
                    users.map(u => {
                      return (
                        <tr key={u.id}>
                          <td>
                            <Link to={`/users/${u.id}`}>{u.name}</Link>
                          </td>
                          <td>{u.blogs.length}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
