const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObject.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');

  response.body.map(blog => {
    expect(blog.id).toBeDefined();
  });
});

test('a new post can be added', async () => {
  const newPost = {
    title: 'Full Stack Open',
    author: 'Matti',
    url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
    likes: 20,
  };

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map(t => t.title);

  expect(titles).toContain('Full Stack Open');
});

test('if the likes is missing, it will be default to 0', async () => {
  const newPost = {
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    url: 'https://eloquentjavascript.net/',
  };

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const like = blogsAtEnd.find(l => l.likes === 0);

  expect(like.likes).toBe(0);
});

test('if the title and url properties are missing', async () => {
  const newPostWithoutTitleAndUrl = {
    author: 'Kyle Simpson',
  };

  await api.post('/api/blogs').send(newPostWithoutTitleAndUrl).expect(400);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
