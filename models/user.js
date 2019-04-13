const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: String,
  password: String,
  storage: [{
    title: String,
    quantity: Number,
  }],
  favorite: [{
    recipeID: {
      type: ObjectId,
      ref: 'Recipe'
    }
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});



const User = mongoose.model('User', userSchema);

module.exports = User;


/*
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var childSchema = new Schema({
     foo: String
});

var Child = mongoose.model('Child',childSchema);

model['Child'] = Child;

var parentSchema = new Schema({
    parent_foo: String
    ,children: [model["Child"].schema]
});

var Parent = mongoose.model('Parent',parentSchema);

model['Parent'] = Parent;



*/