const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Storage = require('./storage');

const userSchema = new Schema({
  username: String,
  password: String, 
  wordTest: String,
  preference:{type: Array, default: []} ,
  storage: {type: Array, default: []},
  favorites:{type: Array, default: []}, 
}, {
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
