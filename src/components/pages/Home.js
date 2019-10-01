import React from 'react';

const Home = () => {
  return (
    <div>
      <div className='section no-pad-bot' id='index-banner'>
        <div className='container'>
          <br />
          <br />
          <h1 className='header center orange-text'>Home Page</h1>
          <div className='row center'>
            <h5 className='header col s12 light'>
              A modern responsive front-end framework based on Material Design
            </h5>
          </div>
          <div className='row center'>
            <a
              href='http://materializecss.com/getting-started.html'
              id='download-button'
              className='btn-large waves-effect waves-light orange'
            >
              Get Started
            </a>
          </div>
          <br />
          <br />
        </div>
      </div>
      <div className='container'>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
