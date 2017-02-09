// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router'

import App from './components/App';
import Login from './components/Login';
import Search from './components/Search';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/search" component={Search} />
    <Route path="/about" component={About} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
