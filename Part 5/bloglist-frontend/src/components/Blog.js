import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button className='btn' onClick={() => toggleShow()}>
          {label}
        </button>
      </div>
      {show && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button onClick={updateBlog}>Like</button>
          </div>
          <div>{blog.author} </div>
          {blog.user[0].username === user.username && <button onClick={deleteBlog}>Remove</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
