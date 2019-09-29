import React, { Fragment, useEffect } from 'react';
import Today from './components/Today';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
// import Home from './components/pages/Home';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

function App() {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Fragment>
      <TopNav />
      <Today />
      <Footer />
    </Fragment>
  );
}

export default App;
