import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);
  const blogFormRef = useRef();

  return (
    <div>
      <h1>Blog App</h1>

      <Togglable buttonLabel='Create A New Blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <ul>
        {blogs.length ? (
          blogs.map(blog => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} <strong style={{ color: '#f5eda9' }}>by {blog.author}</strong>
              </Link>
            </li>
          ))
        ) : (
          <h3>No blogs exists</h3>
        )}
      </ul>
    </div>
  );
};

export default Blogs;
