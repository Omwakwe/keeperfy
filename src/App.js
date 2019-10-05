import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Today from './components/Today';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Signup from './components/Auth/Signup';
import ExpenseState from './context/expense/ExpenseState';
import AuthState from './context/auth/AuthState';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

// const Landing = () => {
//   return (
//     <Fragment>
//       <Today />
//     </Fragment>
//   );
// };

function App() {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <AuthState>
      <ExpenseState>
        <Router>
          <Fragment>
            <TopNav />
            <Switch>
              <Route exact path='/' component={Today} />
              <Route exact path='/about' component={Home} />
              <Route exact path='/signup' component={Signup} />
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </ExpenseState>
    </AuthState>
  );
}

export default App;
