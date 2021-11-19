import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
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

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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

  const allBlogs = () => {
    return (
      <div>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const addBlog = async e => {
    e.preventDefault();
    try {
      const newBlogObject = {
        title: title,
        author: author,
        url: url,
      };

      const returnedBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
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

  const newBlogForm = () => (
    <div>
      <h2>Create new </h2>
      <form onSubmit={addBlog}>
        Title: <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
        Author: <input type='text' value={author} onChange={e => setAuthor(e.target.value)} />
        Url: <input type='text' value={url} onChange={e => setUrl(e.target.value)} />
        <button type='submit'>Create</button>
      </form>
    </div>
  );

  const allBlogsAndCreateBlogsForm = () => (
    <div>
      <h1>Blogs</h1>
      {message && <Notification message={message} checker={checker} />}
      <h3 style={{ display: 'inline' }}>{user.name} logged in </h3>
      <button onClick={handleLogOut}>Logout</button>
      {newBlogForm()}
      {allBlogs()}
    </div>
  );

  const handleLogOut = () => {
    localStorage.removeItem('blogUser');
    window.location.href = '/';
  };

  return <div>{user === null ? loginForm() : allBlogsAndCreateBlogsForm()}</div>;
};

export default App;
