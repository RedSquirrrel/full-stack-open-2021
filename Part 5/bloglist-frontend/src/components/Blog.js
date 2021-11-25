import React, { useState } from 'react';

const Blog = ({ blog }) => {
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
        <button onClick={() => toggleShow()}>{label}</button>
      </div>
      {show && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes 0{blog.like}
            <button>Like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
