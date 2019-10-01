import React, { useContext } from 'react';
import ExpenseContext from '../../context/expense/expenseContext';

const ExpenseRow = ({ expense: { id }, expense }) => {
  const expenseContext = useContext(ExpenseContext);

  const { deleteExpense } = expenseContext;

  const onDelete = () => {
    console.log('expense', id);
    deleteExpense(id);
  };

  return (
    <tr key={id}>
      <td>{expense.category}</td>
      <td>{expense.expense}</td>
      <td>Ksh. {expense.amount}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ExpenseRow;
