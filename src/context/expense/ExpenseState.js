import React, { useReducer } from 'react';
import axios from 'axios';
import ExpenseContext from './expenseContext';
import expenseReducer from './expenseReducer';
import { GET_EXPENSES, ADD_EXPENSE, EXPENSE_ERROR } from '../types';

const ContactState = props => {
  const initialState = {
    expenses: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Get Expenses
  const getExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/expenses');
      console.log('res.data', res.data);
      dispatch({
        type: GET_EXPENSES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXPENSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Expense
  const addExpense = async expense => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/expenses',
        expense,
        config
      );

      console.log('res.data', res.data);

      dispatch({
        type: ADD_EXPENSE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXPENSE_ERROR,
        payload: err.response.msg
      });
    }
  };

  //   // Delete Contact
  //   const deleteContact = async id => {
  //     try {
  //       await axios.delete(`/api/contacts/${id}`);

  //       dispatch({
  //         type: DELETE_CONTACT,
  //         payload: id
  //       });
  //     } catch (err) {
  //       dispatch({
  //         type: CONTACT_ERROR,
  //         payload: err.response.msg
  //       });
  //     }
  //   };

  //   // Update Contact
  //   const updateContact = async contact => {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     };

  //     try {
  //       const res = await axios.put(
  //         `/api/contacts/${contact._id}`,
  //         contact,
  //         config
  //       );

  //       dispatch({
  //         type: UPDATE_CONTACT,
  //         payload: res.data
  //       });
  //     } catch (err) {
  //       dispatch({
  //         type: CONTACT_ERROR,
  //         payload: err.response.msg
  //       });
  //     }
  //   };

  //   // Clear Contacts
  //   const clearContacts = () => {
  //     dispatch({ type: CLEAR_CONTACTS });
  //   };

  //   // Set Current Contact
  //   const setCurrent = contact => {
  //     dispatch({ type: SET_CURRENT, payload: contact });
  //   };

  //   // Clear Current Contact
  //   const clearCurrent = () => {
  //     dispatch({ type: CLEAR_CURRENT });
  //   };

  //   // Filter Contacts
  //   const filterContacts = text => {
  //     dispatch({ type: FILTER_CONTACTS, payload: text });
  //   };

  //   // Clear Filter
  //   const clearFilter = () => {
  //     dispatch({ type: CLEAR_FILTER });
  //   };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getExpenses,
        addExpense
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ContactState;
