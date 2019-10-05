import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Signup = props => {
  const authContext = useContext(AuthContext);

  const { register, error, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    // if (error === 'User already exists') {
    //   setAlert(error, 'danger');
    //   clearErrors();
    // }
  }, [error, isAuthenticated, props.history]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const onSubmit = e => {
    console.log('onSubmit clicked');
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      //   setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      //   setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  const disabled = name === '' || password !== password2 || email === '';

  return (
    <div>
      <div className='section no-pad-bot' id='index-banner'>
        <div className='container'>
          <h3 className='header center orange-text'>Sign up</h3>
          <form onSubmit={onSubmit} style={{ margin: '10px' }}>
            <div style={{ border: '1px solid gainsboro', padding: '10px' }}>
              <div className='row'>
                <div className='input-field col s12 m6'>
                  <input
                    type='text'
                    name='name'
                    value={name}
                    required
                    onChange={e => setName(e.target.value)}
                  />
                  <label htmlFor='name' className='active'>
                    Full Name
                  </label>
                </div>

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

                <div className='input-field col s12 m6'>
                  <input
                    type='password'
                    name='password2'
                    value={password2}
                    required
                    onChange={e => setPassword2(e.target.value)}
                  />
                  <label htmlFor='password2' className='active'>
                    Password Confirm
                  </label>
                </div>
              </div>

              <div className='row'>
                <div className=' col s12'>
                  <input
                    type='submit'
                    value='Save'
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

export default Signup;
