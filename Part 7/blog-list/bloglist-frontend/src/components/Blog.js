import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { likeABlog, deleteABlog } from '../reducers/blogsReducer';

const Blog = ({ blog, blogPostByUser }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const label = !show ? 'View' : 'Hide';
  const toggleShow = () => {
    setShow(show => !show);
  };

  const updateBlog = (id, like) => {
    dispatch(likeABlog(id, like));
  };

  const deleteBlog = id => {
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`)) {
      dispatch(deleteABlog(id));
    }
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
        <button id='viewBtn' className='btn' onClick={() => toggleShow()}>
          {label}
        </button>
      </div>
      {show && (
        <div className='second-div'>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button id='like-button' className='likeBtn' onClick={() => updateBlog(blog.id, blog.likes)}>
              Like
            </button>
          </div>
          {blogPostByUser && (
            <button id='delete-button' className='deleteBtn' style={buttonStyle} onClick={() => deleteBlog(blog.id)}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
