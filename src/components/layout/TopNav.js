import React from 'react';

const TopNav = () => {
  return (
    <nav className='light-blue lighten-1' role='navigation'>
      <div className='nav-wrapper container'>
        <a id='logo-container' href='#!' className='brand-logo'>
          Keeperfy
        </a>
        <ul className='right hide-on-med-and-down'>
          <li>
            <a href='#!'>Currencies</a>
          </li>
          <li>
            <a href='#!'>Categories</a>
          </li>
          <li>
            <a href='#!'>Settings</a>
          </li>
        </ul>
        <ul id='nav-mobile' className='sidenav'>
          <li>
            <a href='#!'>Currencies</a>
          </li>
          <li>
            <a href='#!'>Categories</a>
          </li>
          <li>
            <a href='#!'>Settings</a>
          </li>
        </ul>
        <a href='#!' data-target='nav-mobile' className='sidenav-trigger'>
          <i className='material-icons'>menu</i>
        </a>
      </div>
    </nav>
  );
};

export default TopNav;
