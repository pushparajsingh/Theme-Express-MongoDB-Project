var mongoose = require('mongoose')
var url="mongodb://localhost:27017/meanbatch34"
mongoose.connect(url)
var db = mongoose.connection
console.log("Successfully connected to MongoDB database....")
module.exports = db