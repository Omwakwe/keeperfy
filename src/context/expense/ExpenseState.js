import React, { useReducer } from 'react';
import axios from 'axios';
import moment from 'moment';
import ExpenseContext from './expenseContext';
import expenseReducer from './expenseReducer';
import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  GO_BACK,
  GO_FORWARD,
  EXPENSE_ERROR
} from '../types';

const ContactState = props => {
  const initialState = {
    expenses: null,
    current: null,
    filtered: null,
    error: null,
    from_today: 1,
    yesterday: moment()
      .subtract(1, 'days')
      .format(),
    today: moment().format(),
    tomorrow: moment()
      .add(1, 'days')
      .format()
  };

  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const goBack = () => {
    const new_from_today = state.from_today + 1;
    const new_yesterday = moment()
      .subtract(new_from_today, 'days')
      .format();

    const new_today = moment()
      .subtract(new_from_today - 1, 'days')
      .format();

    const new_tomorrow = moment(new_today)
      .add(1, 'days')
      .format();

    dispatch({
      type: GO_BACK,
      payload: {
        from_today: new_from_today,
        new_yesterday: new_yesterday,
        new_today: new_today,
        new_tomorrow: new_tomorrow
      }
    });
  };

  const goForward = () => {
    const new_from_today = state.from_today - 1;
    const new_yesterday = moment()
      .subtract(new_from_today, 'days')
      .format();

    const new_today = moment()
      .subtract(new_from_today - 1, 'days')
      .format();

    const new_tomorrow = moment(new_today)
      .add(1, 'days')
      .format();

    dispatch({
      type: GO_FORWARD,
      payload: {
        from_today: new_from_today,
        new_yesterday: new_yesterday,
        new_today: new_today,
        new_tomorrow: new_tomorrow
      }
    });
  };

  // Get Expenses
  const getExpenses = async () => {
    try {
      // const res = await axios.get('http://127.0.0.1:6000/api/expenses');
      const res = await axios.get('api/expenses');
      console.log('res.data', res.data);
      dispatch({
        type: GET_EXPENSES,
        payload: res.data
      });
    } catch (err) {
      console.log('getExpenses err', err);
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
      const res = await axios.post('api/expenses', expense, config);

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

  // Delete Contact
  const deleteExpense = async id => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);

      dispatch({
        type: DELETE_EXPENSE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: EXPENSE_ERROR,
        payload: err.response.msg
      });
    }
  };

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
        from_today: state.from_today,
        yesterday: state.yesterday,
        today: state.today,
        tomorrow: state.tomorrow,
        getExpenses,
        addExpense,
        goBack,
        goForward,
        deleteExpense
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ContactState;
