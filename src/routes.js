
import React from 'react';
import { combineReducers } from 'redux'; 
import { Router, Route } from 'react-router'
import { createStore, renderDevTools } from './utils/devTools';
import { Provider } from 'react-redux';
import * as reducers from './reducers/rootReducer';

import App from './components/App';
import Login from './components/Login';
import Search from './components/Search';
import About from './components/About';
import NotFound from './components/NotFound';
const reducer = combineReducers(reducers); 
const store = createStore(reducer);

const Routes = (props) => (
  <div>
  <Provider store={store}>
    <Router {...props}>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/search" component={Search} 
      onEnter={requireAuth} />
      <Route path="/about" component={About} />
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>
  {renderDevTools(store)}
  </div>
);

function requireAuth(nextState, replace) {  
  if (!sessionStorage.jwt) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default Routes;
