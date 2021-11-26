import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginServices from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [message, setMessage] = useState(null);
  const [checker, setChecker] = useState(true);

  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem('blogUser');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    console.log('Logged with', username, password);

    try {
      const user = await loginServices.login({ username, password });
      localStorage.setItem('blogUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setChecker(true);
      setMessage(`Welcome, ${user.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (extention) {
      setChecker(false);
      setMessage('Wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      {message && <Notification message={message} checker={checker} />}
      <form onSubmit={handleLogin}>
        <div>
          Username:{' '}
          <input
            type='text'
            value={username}
            name='Username'
            autoComplete='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:{' '}
          <input
            type='password'
            value={password}
            name='Password'
            autoComplete='current-password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );

  const handleLogOut = () => {
    localStorage.removeItem('blogUser');
    window.location.href = '/';
  };

  const updateBlog = async id => {
    try {
      const blogId = blogs.find(l => l.id === id);
      const changedBlog = { ...blogs, likes: blogId.likes + 1 };

      const returnedBlog = await blogService.update(id, changedBlog);
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)));
    } catch (error) {
      console.log(error);
      setChecker(false);
      setMessage('Update error');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const allBlogs = () => {
    return (
      <div>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} updateBlog={() => updateBlog(blog.id)} />
        ))}
      </div>
    );
  };

  const addBlog = async newBlogObject => {
    blogFormRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(returnedBlog));
      setChecker(true);
      setMessage(`A new blog "${newBlogObject.title}" by "${newBlogObject.author}" added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (extention) {
      setChecker(false);
      setMessage('Not corect');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const allBlogsAndCreateBlogsForm = () => (
    <div>
      <h1>Blogs</h1>
      {message && <Notification message={message} checker={checker} />}
      <h3 style={{ display: 'inline' }}>{user.name} logged in </h3>
      <button onClick={handleLogOut}>Logout</button>
      <Togglable buttonLabel='Create A New Blog' ref={blogFormRef}>
        <BlogForm newBlogObject={addBlog} />
      </Togglable>
      {allBlogs()}
    </div>
  );

  const container = {
    maxWidth: 1000,
    margin: ' 0 auto',
  };

  return <div style={container}>{user === null ? loginForm() : allBlogsAndCreateBlogsForm()}</div>;
};

export default App;
