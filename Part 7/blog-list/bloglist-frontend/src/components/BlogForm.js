import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { showNotification } from '../reducers/notificationReducer';

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const addBlog = e => {
    e.preventDefault();

    blogFormRef.current.toggleVisibility();

    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;

    e.target.title.value = '';
    e.target.author.value = '';
    e.target.url.value = '';

    const content = {
      title,
      author,
      url,
    };
    dispatch(createBlog(content));

    dispatch(showNotification(`A new blog "${content.title}" by "${content.author}" added`, 'success', 2));

    if (!(title && author && url)) {
      dispatch(showNotification('Add a title, author and url', 'error', 2));
      return;
    }
  };

  return (
    <div className='blogForm'>
      <h2>Create new </h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input id='title' type='text' name='title' />
        </div>
        <div>
          Author: <input id='author' type='text' name='author' />
        </div>
        <div>
          Url: <input id='url' type='text' name='url' />
        </div>
        <button id='submitBtn' type='submit'>
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
