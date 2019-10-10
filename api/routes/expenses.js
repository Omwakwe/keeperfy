const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
const Expense = require('../models/Expense');

// @route     GET api/expenses
// @desc      Get all expenses
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const resPerPage = 5; // results per page
    const page = req.query.page || 1; // Page
    const today = req.query.today;
    console.log('req.query ', req.query);
    const expenses = await Expense.find({ user: req.user.id, date: today })
      .sort({
        date: -1
      })
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage);
    const numOfExpenses = await Expense.countDocuments({ user: req.user.id });
    // const pages = Math.ceil(numOfExpenses / resPerPage);

    res.json({ expenses, numOfExpenses });
    // res.status(200).json({ expenses, numOfExpenses });
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
    auth,
    [
      check('expense', 'Expense Name is required')
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
        user: req.user.id
      });

      const addedexpense = await newExpense.save();

      res.json(addedexpense);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/expenses/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { expense, category, amount } = req.body;

  // Build contact object
  const expensesFields = {};
  if (expense) expensesFields.expense = expense;
  if (category) expensesFields.category = category;
  if (amount) expensesFields.amount = amount;

  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: 'expense not found' });

    // Make sure user owns expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: expensesFields },
      { new: true }
    );

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/expenses
// @desc      Add new expenses
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense_id = req.params.id;
    const expense = await Expense.findById({ _id: expense_id });

    if (!expense) return res.status(404).json({ msg: 'Expense not found' });

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Expense.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
