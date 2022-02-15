import React from 'react';
import { login } from '../reducers/authReducer';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async e => {
    e.preventDefault();
    const username = await e.target.username.value;
    const password = await e.target.password.value;
    dispatch(login(username, password));
    e.target.username.value = '';
    e.target.password.value = '';
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input id='username' type='text' name='username' autoComplete='username' />
        </div>
        <div>
          Password:
          <input id='password' type='password' name='password' autoComplete='current-password' />
        </div>
        <button id='loginBtn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
