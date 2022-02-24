import React, { useRef } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);
  const blogFormRef = useRef();

  return (
    <div>
      <h3 className='my-5'>Blog App</h3>

      <Togglable buttonLabel='Create A New Blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Blogs Titles</th>
            <th>Added by </th>
          </tr>
        </thead>

        <tbody>
          {blogs.length ? (
            blogs.map(blog => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} <strong className='text white'>by {blog.author}</strong>
                  </Link>
                </td>
                <td>
                  <Link to={`/users/${blog.user.id}`}> {blog.user.username}</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='h4'>No blogs exists</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Blogs;
