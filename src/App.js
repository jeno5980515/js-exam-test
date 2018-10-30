import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from 'components/Pages/LoginPage';
import Page from 'components/Pages/Page';

const { PUBLIC_URL } = process.env;

const App = () => (
  <Router basename={PUBLIC_URL}>
    <div>
      <Route exact path="/" component={Page} />
      <Route exact path="/login" component={LoginPage} />
    </div>
  </Router>
);

export default App;
