import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ExpenseContext from '../../context/expense/expenseContext';

const TopNav = () => {
  const authContext = useContext(AuthContext);
  const expenseContext = useContext(ExpenseContext);

  const { isAuthenticated, user, logout } = authContext;

  const onLogout = e => {
    // console.log('logout click');
    logout();
    expenseContext.clearExpenses();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          Logout
        </a>
      </li>
      <li>
        <a href='#!'>Categories</a>
      </li>
      <li>
        <a href='#!'>Settings</a>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' /> Logout
          {/* <span className='hide-sm'>Logout</span> */}
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/signup'>Signup</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='light-blue lighten-1' role='navigation'>
      <div className='nav-wrapper container'>
        <a id='logo-container' href='#!' className='brand-logo'>
          Keeperfy
        </a>
        <ul className='right hide-on-med-and-down'>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
        <ul id='nav-mobile' className='sidenav'>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
        <a href='#!' data-target='nav-mobile' className='sidenav-trigger'>
          <i className='material-icons'>menu</i>
        </a>
      </div>
    </nav>
  );
};

export default TopNav;
