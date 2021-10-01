const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'The Complete JavaScript Promise Guide',
    author: 'Kyle Cook',
    url: 'https://blog.webdevsimplified.com/2021-09/javascript-promises/',
    likes: 10,
  },
  {
    title: 'How to add testing to an existing project',
    author: 'Kent C. Dodds',
    url: 'https://kentcdodds.com/blog/how-to-add-testing-to-an-existing-project',
    likes: 20,
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDB };
