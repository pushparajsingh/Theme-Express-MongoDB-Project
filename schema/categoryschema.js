//Require Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var CategorySchema = mongoose.Schema({
  _id: Number,
  catnm: {
    type: String,
    required: [true,"Category name is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  caticonnm: {
    type: String,
    required: [true,"Category icon name is required"],
  }
});

// Apply the uniqueValidator plugin to CategorySchema.
CategorySchema.plugin(uniqueValidator);

// compile schema to model
var CategorySchemaModel = mongoose.model('category', CategorySchema,'category');

module.exports = CategorySchemaModel