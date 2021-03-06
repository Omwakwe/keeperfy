import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import ExpenseContext from '../context/expense/expenseContext';
import AuthContext from '../context/auth/authContext';
import ExpenseRow from './pages/ExpenseRow';
// import Preloader from './layout/Preloader';
// import Example from './pages/SampleChart';
// import M from 'materialize-css/dist/js/materialize.min.js';
import Pagination from 'react-js-pagination';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const Today = () => {
  const expenseContext = useContext(ExpenseContext);
  const authContext = useContext(AuthContext);
  const [activePage, setActivePage] = useState(1);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const {
    expenses,
    yesterday,
    today,
    tomorrow,
    getExpenses,
    addExpense,
    current,
    numOfExpenses,
    goBack,
    updateExpense,
    clearCurrent,
    goForward
  } = expenseContext;

  useEffect(() => {
    // console.log('getExpenses call');
    getExpenses(activePage, today);
    authContext.loadUser();
    if (current !== null) {
      setAmount(current.amount);
      setCategory(current.category);
      setItem(current.expense);
    } else {
      setAmount('');
      setCategory('');
      setItem('');
    }
    // eslint-disable-next-line
  }, [today, current, activePage]);

  // const [totalItemsCount, setTotalItemsCount] = useState(50);

  const disabled = amount === '' || item === '' || category === '';

  const back = () => {
    goBack();
  };

  const alltomorrow = tomorrow > moment().format();

  const onSubmit = e => {
    e.preventDefault();
    const new_expense = {
      // user: 'Anonymous',
      expense: item,
      category: category,
      amount: amount
    };
    // const new_state = [...expenses, new_expense];
    // console.log('new_state', new_state);
    // setExpenses([...expenses, new_expense]);
    if (current === null) {
      addExpense(new_expense);
    } else {
      new_expense._id = current._id;
      updateExpense(new_expense);
      clearCurrent();
    }

    clearForm();
  };

  const clearForm = () => {
    setAmount('');
    setCategory('');
    setItem('');
  };

  const handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };

  const handleDateChange = newDate => {
    console.log(`newDate is ${newDate}`);
    setStartDate(newDate);
  };

  return (
    <div>
      <div className='section no-pad-bot' id='index-banner'>
        <div className='container'>
          <h3 className='header center orange-text'>
            {current ? 'Edit' : 'Enter an Expense'}
          </h3>

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
                  <label htmlFor='item' className='active'>
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
                    value={current ? 'Update' : 'Save'}
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
                    <th>Edit</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses !== null && expenses.length === 0 && (
                    <tr>
                      <td colSpan='6' style={{ textAlign: 'center' }}>
                        No expenses added yet
                      </td>
                    </tr>
                  )}
                  {expenses !== null ? (
                    expenses.map(expense => (
                      <ExpenseRow key={expense._id} expense={expense} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan='6'>Loading ...</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {numOfExpenses > 0 ? (
                <div>
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={numOfExpenses}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className='row'>
            <div className=' col s12 l4'>
              <a
                href='#!'
                id='yesterday'
                className='btn waves-effect waves-light blue'
                onClick={back}
              >
                <i className='material-icons left'>keyboard_backspace</i>
                Yesterday (
                <span>{moment(yesterday).format('MMMM Do YYYY')}</span>)
              </a>
            </div>
            <div className=' col s12 l4'>
              <DatePicker selected={startDate} onChange={handleDateChange} />
            </div>
            <div className=' col s12 l4'>
              <a
                href='#!'
                id='Tomorrow'
                className='btn waves-effect waves-light blue right '
                onClick={goForward}
                disabled={alltomorrow}
              >
                <i className='material-icons right'>arrow_right_alt</i>
                Tomorrow (<span>{moment(tomorrow).format('MMMM Do YYYY')}</span>
                )
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
