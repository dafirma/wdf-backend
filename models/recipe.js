const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipeID: String,
  title: String,
  ingredients: String,
  description: String,
  duration: Number,
  image: String,
  healthLabels: [
    {
      type: String,
    }
  ]


});

const Recipe =  mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;