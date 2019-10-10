import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  GO_BACK,
  GO_FORWARD,
  CLEAR_EXPENSES,
  SET_CURRENT,
  UPDATE_EXPENSE,
  CLEAR_CURRENT,
  EXPENSE_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload.expenses,
        numOfExpenses: action.payload.numOfExpenses,
        loading: false
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
        loading: false
      };
    case GO_BACK:
      return {
        ...state,
        yesterday: action.payload.new_yesterday,
        today: action.payload.new_today,
        tomorrow: action.payload.new_tomorrow,
        from_today: action.payload.from_today,
        loading: false
      };
    case GO_FORWARD:
      return {
        ...state,
        yesterday: action.payload.new_yesterday,
        today: action.payload.new_today,
        tomorrow: action.payload.new_tomorrow,
        from_today: action.payload.from_today,
        loading: false
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense._id === action.payload._id ? action.payload : expense
        ),
        loading: false
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          expense => expense._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_EXPENSES:
      return {
        ...state,
        expenses: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    //   case FILTER_CONTACTS:
    //     return {
    //       ...state,
    //       filtered: state.contacts.filter(contact => {
    //         const regex = new RegExp(`${action.payload}`, 'gi');
    //         return contact.name.match(regex) || contact.email.match(regex);
    //       })
    //     };
    //   case CLEAR_FILTER:
    //     return {
    //       ...state,
    //       filtered: null
    //     };
    case EXPENSE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
