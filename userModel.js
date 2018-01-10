const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);