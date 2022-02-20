import blogsServices from '../services/blogs';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ALL_BLOGS':
      return action.data;

    case 'NEW_BLOG':
      return [...state, action.data];

    case 'NEW_COMMENT': {
      const id = action.data.id;
      const blogToUpdate = state.find(blog => blog.id === id);
      const blogWithComment = {
        ...blogToUpdate,
        comment: action.data.comment,
      };
      return state.map(blog => (blog.id !== id ? blog : blogWithComment));
    }

    case 'LIKE_BLOG': {
      const id = action.data.id;
      const blogToLike = state.find(b => b.id === id);
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
      return state
        .map(b => (b.id === id ? { ...likedBlog, likes: likedBlog.likes } : b))
        .sort((a, b) => b.likes - a.likes);
    }

    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data);

    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsServices.getAll();
    dispatch({
      type: 'ALL_BLOGS',
      data: blogs,
    });
  };
};

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogsServices.create(content);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export const likeABlog = (id, like) => {
  return async dispatch => {
    const addLike = await blogsServices.update(id, like + 1);
    dispatch({
      type: 'LIKE_BLOG',
      data: addLike,
    });
  };
};

export const deleteABlog = id => {
  return async dispatch => {
    await blogsServices.removeBlog(id);
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    });
  };
};

export const createComment = (blog, blogId, comment) => {
  return async dispatch => {
    const updatedBlog = await blogsServices.addComment(blogId.id, blog, comment);
    dispatch({
      type: 'NEW_COMMENT',
      data: updatedBlog,
    });
  };
};

export default blogsReducer;
