//Require Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var PaymentSchema = mongoose.Schema({
  _id: Number,
  uid: {
    type: String,
    required: [true,"Userid name is required"],
    lowercase: true,
    trim: true,
  },
  amt: {
    type: Number,
    required: [true,"Amount is required"],
  },
  info: {
    type: String,
  }
});

// Apply the uniqueValidator plugin to CategorySchema.
PaymentSchema.plugin(uniqueValidator);

// compile schema to model
var PaymentSchemaModel = mongoose.model('payment', PaymentSchema,'payment');

module.exports = PaymentSchemaModel
