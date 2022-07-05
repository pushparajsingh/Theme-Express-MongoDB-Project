//Require Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var RegisterSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true,"Name is required"],
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true,"Username is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true,"Password is required"],
    maxlength: 10,
    minlength:5,
    trim: true
  },
  mobile: String,
  address: String,
  city: String,
  gender: String,
  role: String,
  status: Number,
  info: String
});

// Apply the uniqueValidator plugin to RegisterSchema.
RegisterSchema.plugin(uniqueValidator);

// compile schema to model
var RegisterSchemaModel = mongoose.model('register', RegisterSchema,'register');

module.exports = RegisterSchemaModel