import { useState } from 'react';

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
    <div>
      <h2>Create new </h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author: <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Url: <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
