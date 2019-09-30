import React, { useState, useContext, useEffect } from 'react';
import uuid from 'uuid';
import ExpenseContext from '../context/expense/expenseContext';
// import Preloader from './layout/Preloader';
import Example from './pages/SampleChart';

const Today = () => {
  const expenseContext = useContext(ExpenseContext);
  const { expenses, getExpenses, addExpense } = expenseContext;

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');

  // const [expenses, setExpenses] = useState([
  //   { id: 1, category: 'Transport', expense: 'Morning commute', amount: 80 },
  //   { id: 2, category: 'Food', expense: 'Breakfirst', amount: 80 },
  //   { id: 3, category: 'House', expense: 'Shopping', amount: 80 }
  // ]);

  const onSubmit = e => {
    e.preventDefault();
    const new_expense = {
      id: uuid(),
      user: 'Anonymous',
      expense: item,
      category: category,
      date: Date(),
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
          <p className='center'>Sunday, 29 September</p>
          <Example />
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
                  />
                </div>
              </div>
            </div>

            {/* <hr /> */}

            <div className='row'>
              <div className=' col s12'>
                <table className='striped responsive-table'>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Item Name</th>
                      <th>Item Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {expenses !== null ? (
                      expenses.map(expense => (
                        <tr key={expense.id}>
                          <td>{expense.category}</td>
                          <td>{expense.expense}</td>
                          <td>Ksh. {expense.amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='4'>No expenses added yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </form>

          <div className='row'>
            <div className=' col s6'>
              <a
                href='#!'
                id='yesterday'
                className='btn waves-effect waves-light blue'
              >
                <i className='material-icons left'>keyboard_backspace</i>
                Yesterday
              </a>
            </div>
            <div className=' col s6'>
              <a
                href='#!'
                id='Tomorrow'
                className='btn waves-effect waves-light blue right disabled'
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
