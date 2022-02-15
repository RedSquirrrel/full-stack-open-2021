import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import User from './components/User';
import Users from './components/Users';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

import { logOut, loadUser } from './reducers/authReducer';
import { initializeUsers } from './reducers/usersReducer';
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.loggedUser);
  const blogs = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(loadUser());
  }, [blogs.length]);

  const handleLogOut = () => {
    dispatch(logOut(userInfo));
    window.location.href = '/';
  };

  return (
    <div>
      <Notification />
      <Link to='/'>Blogs</Link>
      <Link to='/users'>Users</Link>

      {userInfo && (
        <p style={{ display: 'inline' }}>
          {userInfo.name} logged in
          <button onClick={handleLogOut}>Logout</button>
        </p>
      )}

      <Routes>
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/users' element={userInfo === null ? <LoginForm /> : <Users />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={userInfo === null ? <LoginForm /> : <Blogs />} />
      </Routes>
    </div>
  );
};

export default App;
