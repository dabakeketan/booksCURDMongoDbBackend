const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Book = new Schema({
  title:  String,
  price: Number,
  author: String,
}, {
  collection: 'test_data',
  timestamps: true
})
module.exports = mongoose.model('Book', Book)