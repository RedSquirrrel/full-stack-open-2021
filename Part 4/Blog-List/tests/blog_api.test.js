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

describe('returned blogs', () => {
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
});

describe('creating new blog', () => {
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

  test('if the likes property is missing, it will be default to 0', async () => {
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
});

describe('deletion of a blog', () => {
  test('if delete is succeeded the response status code is 204', async () => {
    const blogAtStart = await helper.blogsInDB();
    const blogToDelete = blogAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`);
    expect(204);

    const blogsAtEnd = await helper.blogsInDB();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map(t => t.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating of a blog post', () => {
  test('update the amount of likes of a blog post', async () => {
    const blogAtStart = await helper.blogsInDB();
    const blogToUpdate = blogAtStart[0];

    blogToUpdate.likes += 1;

    await api.put(`/api/blogs/${blogToUpdate.id}`);
    expect(200);

    const like = blogAtStart.map(l => l.likes);
    const blogsAtEnd = await helper.blogsInDB();

    expect(blogsAtEnd).toHaveLength(blogAtStart.length);
    expect(like[0]).toBe(21);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
