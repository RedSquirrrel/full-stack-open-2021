import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog, blogPostByUser, user }) => {
  const [show, setShow] = useState(false);

  const label = !show ? 'View' : 'Hide';
  const toggleShow = () => {
    setShow(show => !show);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonStyle = {
    background: 'blue',
    color: 'white',
  };

  return (
    <div style={blogStyle} className='blogs'>
      <div className='first-div'>
        {blog.title} <strong style={{ color: '#f5eda9' }}>by {blog.author}</strong>
        <button className='btn' onClick={() => toggleShow()}>
          {label}
        </button>
      </div>
      {show && (
        <div className='second-div'>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button className='likeBtn' onClick={updateBlog}>
              Like
            </button>
          </div>
          {blogPostByUser === user.username ? (
            <button className='deleteBtn' style={buttonStyle} onClick={deleteBlog}>
              Remove
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
};

export default Blog;
