const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'users'
  //   },
  user: {
    type: String,
    required: true
  },
  expense: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  amount: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('expense', ExpenseSchema);
