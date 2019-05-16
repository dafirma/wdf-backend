const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')

const storageSchema = new Schema({
  name: String,
  quantity: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Storage =  mongoose.model('Storage', storageSchema);
module.exports = Storage;