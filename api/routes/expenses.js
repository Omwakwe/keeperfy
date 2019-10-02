const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
const Expense = require('../models/Expense');

// @route     GET api/expenses
// @desc      Get all expenses
// @access    Private
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: 'Anonymous' }).sort({
      date: -1
    });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/expenses
// @desc      Add new expenses
// @access    Private
router.post(
  '/',
  [
    [
      check('expense', 'Expense is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { expense, category, amount } = req.body;

    try {
      const newExpense = new Expense({
        expense,
        category,
        amount,
        user: 'Anonymous'
      });

      const addedexpense = await newExpense.save();

      res.json(addedexpense);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
