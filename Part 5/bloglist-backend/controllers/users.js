const usersRouter = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, likes: 1 });
  response.json(users.map(u => u.toJSON()));
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.password === undefined) {
    return response.status(400).json({ error: 'password must be given' });
  } else if (body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 character long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
