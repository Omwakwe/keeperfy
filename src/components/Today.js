import React, { useState, useContext, useEffect } from 'react';
import uuid from 'uuid';
import moment from 'moment';
import ExpenseContext from '../context/expense/expenseContext';
import ExpenseRow from './pages/ExpenseRow';
// import Preloader from './layout/Preloader';
// import Example from './pages/SampleChart';

const Today = () => {
  const expenseContext = useContext(ExpenseContext);
  const {
    expenses,
    yesterday,
    today,
    tomorrow,
    getExpenses,
    addExpense,
    goBack,
    goForward
  } = expenseContext;

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');

  const disabled = amount === '' || item === '' || category === '';

  const back = () => {
    goBack();
  };

  const onSubmit = e => {
    e.preventDefault();
    const new_expense = {
      id: uuid(),
      user: 'Anonymous',
      expense: item,
      category: category,
      date: moment().format(),
      amount: amount
    };
    const new_state = [...expenses, new_expense];
    console.log('new_state', new_state);
    // setExpenses([...expenses, new_expense]);
    addExpense(new_expense);
    clearForm();
  };

  const clearForm = () => {
    setAmount('');
    setCategory('');
    setItem('');
  };

  return (
    <div>
      <div className='section no-pad-bot' id='index-banner'>
        <div className='container'>
          <h3 className='header center orange-text'>Enter an Expense</h3>
          <p className='center'>{moment(today).format('MMMM Do YYYY')}</p>
          <form onSubmit={onSubmit}>
            <div style={{ border: '1px solid gainsboro', padding: '10px' }}>
              <div className='row'>
                <div className='input-field col s12 m6'>
                  <input
                    type='text'
                    name='amount'
                    value={amount}
                    required
                    onChange={e => setAmount(e.target.value)}
                  />
                  <label htmlFor='message' className='active'>
                    Amount
                  </label>
                </div>

                <div className='input-field col s12 m6'>
                  <input
                    type='text'
                    name='item'
                    value={item}
                    required
                    onChange={e => setItem(e.target.value)}
                  />
                  <label htmlFor='message' className='active'>
                    Item Name
                  </label>
                </div>

                <div className='input-field col s12 m6'>
                  <select
                    name='category'
                    value={category}
                    className='browser-default'
                    required
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value='' disabled>
                      Select Category
                    </option>
                    <option value='Transport'>Transport</option>
                    <option value='Food'>Food</option>
                    <option value='Entertainment'>Entertainment</option>
                    <option value='House'>House</option>
                  </select>
                </div>
              </div>

              <div className='row'>
                <div className=' col s12'>
                  <input
                    type='submit'
                    value='Save'
                    className='btn btn-primary btn-block'
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className='row'>
            <div className=' col s12'>
              <table className='striped responsive-table'>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses !== null && expenses.length === 0 && (
                    <tr>
                      <td colSpan='4'>No expenses added yet</td>
                    </tr>
                  )}
                  {expenses !== null ? (
                    expenses.map(expense => (
                      <ExpenseRow key={expense.id} expense={expense} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan='4'>Loading ...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className='row'>
            <div className=' col s6'>
              <span>{moment(yesterday).format('MMMM Do YYYY')}</span>
              <a
                href='#!'
                id='yesterday'
                className='btn waves-effect waves-light blue'
                onClick={back}
              >
                <i className='material-icons left'>keyboard_backspace</i>
                Yesterday
              </a>
            </div>
            <div className=' col s6'>
              <span className='right'>
                {moment(tomorrow).format('MMMM Do YYYY')}
              </span>
              <a
                href='#!'
                id='Tomorrow'
                className='btn waves-effect waves-light blue right '
                onClick={goForward}
              >
                <i className='material-icons right'>arrow_right_alt</i>
                Tomorrow
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
