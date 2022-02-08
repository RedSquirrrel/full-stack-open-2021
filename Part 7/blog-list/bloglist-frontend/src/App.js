import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginServices from './services/login';

import storage from './utlis/storage';
import './index.css';

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    setUser(user);
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    console.log('Logged with', username, password);

    try {
      const user = await loginServices.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
      storage.saveUser(user);
      dispatch(showNotification(`Welcome, ${user.name}`, 'success', 2));
    } catch (extention) {
      dispatch(showNotification('Wrong username or password', 'error', 2));
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            autoComplete='username'
            onChange={({ target }) => setUsername(target.value.trim())}
          />
        </div>
        <div>
          Password:
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            autoComplete='current-password'
            onChange={({ target }) => setPassword(target.value.trim())}
          />
        </div>
        <button id='loginBtn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );

  const handleLogOut = () => {
    setUser(null);
    storage.logoutUser();
    window.location.href = '/';
  };

  const updateBlog = async id => {
    try {
      const blogToLike = blogs.find(b => b.id === id);
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id };
      await blogService.update(likedBlog);
      setBlogs(sortedBlogs.map(b => (b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b)));
    } catch (error) {
      console.log(error);
      dispatch(showNotification('Update error', 2));
    }
  };

  const allBlogs = () => {
    return (
      <div>
        {blogs.length &&
          blogs.map(blog => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                blogPostByUser={user.username === blog.user.username}
              />
            );
          })}
      </div>
    );
  };

  const addBlog = async newBlogObject => {
    blogFormRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(returnedBlog));
      dispatch(
        showNotification(`A new blog "${newBlogObject.title}" by "${newBlogObject.author}" added`, 'success', 2)
      );
    } catch (extention) {
      dispatch(showNotification('Add a title, author and url', 'error', 2));
    }
  };

  const allBlogsAndCreateBlogsForm = () => (
    <div>
      <h1>Blogs</h1>
      <h3 style={{ display: 'inline' }}>{user.name} logged in </h3>
      <button onClick={handleLogOut}>Logout</button>
      <Togglable buttonLabel='Create A New Blog' ref={blogFormRef}>
        <BlogForm newBlogObject={addBlog} />
      </Togglable>
      {blogs.length ? allBlogs() : <h3>No blogs exists</h3>}
    </div>
  );

  const deleteBlog = async id => {
    const blog = blogs.find(l => l.id === id);

    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`)) {
      await blogService.removeBlog(id);
      setBlogs(blogs.filter(b => b.id !== blog.id));
    }
  };

  return (
    <div>
      <Notification />
      <div>{user === null ? loginForm() : allBlogsAndCreateBlogsForm()}</div>
    </div>
  );
};

export default App;
