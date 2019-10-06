import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const Login = props => {
  const authContext = useContext(AuthContext);

  const { login, error, isAuthenticated, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      M.toast({ html: error });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    console.log('onSubmit clicked');
    e.preventDefault();
    if (email === '' || password === '') {
      M.toast({ html: 'Please enter the email and password' });
    } else {
      login({
        email,
        password
      });
    }
  };

  const disabled = password === '' || email === '';

  return (
    <div>
      <div className='section no-pad-bot' id='index-banner'>
        <div className='container'>
          <h3 className='header center orange-text'>Sign in</h3>
          <form onSubmit={onSubmit} style={{ margin: '10px' }}>
            <div style={{ border: '1px solid gainsboro', padding: '10px' }}>
              <div className='row'>
                <div className='input-field col s12 m6'>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor='email' className='active'>
                    Your Email
                  </label>
                </div>

                <div className='input-field col s12 m6'>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                  <label htmlFor='password' className='active'>
                    Password
                  </label>
                </div>
              </div>

              <div className='row'>
                <div className=' col s12'>
                  <input
                    type='submit'
                    value='Sign in'
                    className='btn btn-primary btn-block'
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
