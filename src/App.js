import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Today from './components/Today';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import ExpenseState from './context/expense/ExpenseState';

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
    <ExpenseState>
      <Router>
        <Fragment>
          <TopNav />
          <Switch>
            <Route exact path='/' component={Today} />
            <Route exact path='/about' component={Home} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </ExpenseState>
  );
}

export default App;
