const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = mongoose.Schema({
  Post: {
    id: ObjectId,
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: true
    },
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
