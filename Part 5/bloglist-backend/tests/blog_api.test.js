const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const bycript = require('bcryptjs');

const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

const getUserToken = async () => {
  await api.post('/api/users').send(helper.newUser);
  const login = await api.post('/api/login').send(helper.newUser).expect(200);
  return login.body.token;
};

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObject.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('BLOG', () => {
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
      const token = await getUserToken();

      const newPost = {
        title: 'Full Stack Open',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
        likes: 20,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map(t => t.title);

      expect(titles).toContain('Full Stack Open');
    });

    test('a new post can not be added if token is not provided', async () => {
      const newPost = {
        title: 'JavaScript String Contains – How to use JS .includes()',
        author: 'Jessica Wilkins',
        url: 'https://www.freecodecamp.org/news/javascript-string-contains-how-to-use-js-includes/',
        likes: 10,
      };

      await api
        .post('/api/blogs')
        .send(newPost)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test('if the likes property is missing, it will be default to 0', async () => {
      const token = await getUserToken();

      const newPost = {
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        url: 'https://eloquentjavascript.net/',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
      const like = blogsAtEnd.find(l => l.likes === 0);

      expect(like.likes).toBe(0);
    });

    test('if the title and url properties are missing', async () => {
      const token = await getUserToken();

      const newPostWithoutTitleAndUrl = {
        author: 'Kyle Simpson',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newPostWithoutTitleAndUrl)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe('updating of a blog post', () => {
    test('update the amount of likes of a blog post', async () => {
      const token = await getUserToken();

      const blogAtStart = await helper.blogsInDB();
      const blogToUpdate = blogAtStart[0];

      blogToUpdate.likes += 1;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(200);

      const like = blogAtStart.map(l => l.likes);
      expect(like[0]).toBe(21);
    });
  });

  describe('DELETE/deletion of a blog', () => {
    test('if delete is succeeded the response status code is 204', async () => {
      const loginUser = {
        username: helper.newUser.username,
        password: helper.newUser.password,
      };

      const loggedUser = await api
        .post('/api/login')
        .send(loginUser)
        .expect('Content-Type', /application\/json/)
        .expect(200);

      const blogAtStart = await helper.blogsInDB();
      const blogToDelete = blogAtStart[1];

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .send(blogToDelete)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDB();
      const blogSavedByUser = blogsAtEnd[blogsAtEnd.length - 1];

      await api
        .delete(`/api/blogs/${blogSavedByUser.id}`)
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .expect(204);

      const titles = blogsAtEnd.map((t, i) => t.title);
      expect(titles[2]).not.toContainEqual(blogSavedByUser.title);
    });
  });
});

describe('USER', () => {
  describe('when there is one user in database', () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bycript.hash('supersecret', 10);
      const user = new User({ username: 'squirrel', name: 'superTest', passwordHash });

      await user.save();
    });

    test('creating new user fails if the username already exist in the database', async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: 'squirrel',
        name: 'flying squirrel',
        password: 'password',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('`username` to be unique');

      const usersAtEnd = await helper.usersInDB();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creating new user fails if the username is shorter then 3 characters', async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: 'sq',
        name: 'anette',
        password: 'password',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain(
        '`username` (`sq`) is shorter than the minimum allowed length (3)'
      );

      const usersAtEnd = await helper.usersInDB();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creating new user fails if the username is missing', async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        name: 'anette',
        password: 'password',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('`username` is required');

      const usersAtEnd = await helper.usersInDB();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creating new user fails if the password is shorter then 3 characters', async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: 'hellas',
        name: 'Arto Hellas',
        password: 'pa',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('password must be at least 3 character long');

      const usersAtEnd = await helper.usersInDB();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('creating new user fails if the password is missing', async () => {
      const usersAtStart = await helper.usersInDB();

      const newUser = {
        username: 'hellas',
        name: 'Arto Hellas',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('password must be given');

      const usersAtEnd = await helper.usersInDB();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
