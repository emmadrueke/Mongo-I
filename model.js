const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Users = new Schema({
  userName: {
    type: String
    },
  userPassword: {
    type: String
    },
  created_at: {
      type: Date,
      default: Date.now,
    }
  }
);

module.exports = mongoose.model('users', Users)