import React, { useState } from 'react';

const Today = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(1);
  const [item, setItem] = useState('');

  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Transport', name: 'Morning commute', price: 80 },
    { id: 2, category: 'Food', name: 'Breakfirst', price: 80 },
    { id: 3, category: 'House', name: 'Shopping', price: 80 }
  ]);

  return (
    <div>
      <div className='section no-pad-bot' id='index-banner'>
        <div className='container'>
          <h3 className='header center orange-text'>Enter an Expense</h3>
          <p className='center'>Sunday, 29 September</p>

          <div style={{ border: '1px solid gainsboro', padding: '10px' }}>
            <div className='row'>
              <div className='input-field col s12 m6'>
                <input
                  type='text'
                  name='amount'
                  value={amount}
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
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value='' disabled>
                    Select Technician
                  </option>
                  <option value='1'>Transport</option>
                  <option value='2'>Food</option>
                  <option value='3'>Entertainment</option>
                </select>
              </div>
            </div>

            <div className='row'>
              <div className=' col s12'>
                <a
                  href='#!'
                  id='save'
                  className='btn waves-effect waves-light blue'
                  onClick={e =>
                    setExpenses([
                      ...expenses,
                      {
                        id: 4,
                        category: 'Transport',
                        name: 'name',
                        price: 45
                      }
                      // {
                      //   id: 4,
                      //   category: { category },
                      //   name: { item },
                      //   price: { amount }
                      // }
                    ])
                  }
                >
                  Save
                </a>
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
                  {expenses.length === 0 ? (
                    <tr>
                      <td>No expenses added yet</td>
                    </tr>
                  ) : (
                    expenses.map(expense => (
                      <tr key={expense.id}>
                        <td>{expense.category}</td>
                        <td>{expense.name}</td>
                        <td>Ksh. {expense.price}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

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
