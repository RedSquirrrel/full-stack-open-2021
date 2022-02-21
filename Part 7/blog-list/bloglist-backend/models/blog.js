const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [5, ' Title "{VALUE}" is too short. Add at least 5 characters'],
  },
  author: {
    type: String,
    required: true,
    minLength: [5, ' Author "{VALUE}" is too short. Add at least 5 characters'],
  },
  url: {
    type: String,
    required: true,
    minLength: [5, ' Url "{VALUE}" is too short. Add at least 5 characters'],
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comment: Array,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
