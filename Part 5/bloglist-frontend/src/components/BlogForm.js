import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ newBlogObject }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async e => {
    e.preventDefault();
    newBlogObject({
      title: title,
      author: author,
      url: url,
    });
    if (title === '' && author === '' && url === '') {
      return;
    }

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div className='blogForm'>
      <h2>Create new </h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input id='title' type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author: <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Url: <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  newBlogObject: PropTypes.func.isRequired,
};

export default BlogForm;
