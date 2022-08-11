const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  isCompleted:{
    type: Boolean,
    required: false,
    default: false,
  }
});
module.exports = mongoose.model('Task', taskSchema);
