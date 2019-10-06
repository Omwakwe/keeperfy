import React, { useContext } from 'react';
import ExpenseContext from '../../context/expense/expenseContext';

const ExpenseRow = ({ expense: { _id }, expense }) => {
  const expenseContext = useContext(ExpenseContext);

  const { deleteExpense, setCurrent } = expenseContext;

  const onDelete = () => {
    // console.log('expense', id);
    deleteExpense(_id);
  };

  const onSetCurrent = e => {
    e.preventDefault();
    setCurrent(expense);
  };

  return (
    <tr key={_id}>
      <td>{expense.category}</td>
      <td>{expense.expense}</td>
      <td>Ksh. {expense.amount}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={onSetCurrent}>
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ExpenseRow;
