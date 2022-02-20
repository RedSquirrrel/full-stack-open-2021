import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeABlog, deleteABlog, createComment } from '../reducers/blogsReducer';

const Blog = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.loggedUser);
  const blogs = useSelector(state => state.blogs);
  const id = useParams().id;
  const blog = blogs.find(b => b.id === id);

  // if a blog is deleted
  if (!blog) {
    return (window.location.href = '/');
  } else if (!blogs) {
    return null;
  }

  const updateBlog = (id, like) => {
    dispatch(likeABlog(id, like));
  };

  const deleteBlog = id => {
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`)) {
      dispatch(deleteABlog(id));
    }
  };

  const addComment = e => {
    e.preventDefault();

    const comment = e.target.comment.value;
    e.target.comment.value = '';

    dispatch(createComment(blog.id, blog, comment));
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
      <div className='second-div'>
        <h1>{blog.title}</h1>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button id='like-button' className='likeBtn' onClick={() => updateBlog(blog.id, blog.likes)}>
            Like
          </button>
        </div>
        <p>
          {' '}
          <strong style={{ color: '#f5eda9' }}> Added by {blog.author}</strong>
        </p>
        {userInfo.username === blog.user.username && (
          <button id='delete-button' className='deleteBtn' style={buttonStyle} onClick={() => deleteBlog(blog.id)}>
            Remove
          </button>
        )}
        <div>
          <p>Comments:</p>
          <form onSubmit={addComment}>
            <input name='comment' type='text' />
            <button>Add comment</button>
          </form>
          <ul>
            {blog.comment &&
              blog.comment.map((c, i) => {
                return <li key={i}>{c}</li>;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
