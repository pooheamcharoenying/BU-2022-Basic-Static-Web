const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: true
  },
});
module.exports = Item = mongoose.model('testcollection', UserSchema);