import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

import { logOut, loadUser } from './reducers/userReducer';
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const userInfo = useSelector(state => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const handleLogOut = () => {
    dispatch(logOut(userInfo.user));
    window.location.href = '/';
  };

  return (
    <div>
      <Notification />
      <div>
        {userInfo === null ? (
          <LoginForm />
        ) : (
          <div>
            <h1>Blogs</h1>
            <h3 style={{ display: 'inline' }}>{userInfo.username} logged in </h3>
            <button onClick={handleLogOut}>Logout</button>
            <Togglable buttonLabel='Create A New Blog' ref={blogFormRef}>
              <BlogForm blogFormRef={blogFormRef} />
            </Togglable>
            {blogs.length ? (
              blogs.map(blog => {
                return <Blog key={blog.id} blog={blog} blogPostByUser={userInfo.username === blog.user.username} />;
              })
            ) : (
              <h3>No blogs exists</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
