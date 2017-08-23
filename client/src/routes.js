import React from 'react';
import { Route } from 'react-router';
import App from './App';
import MatchPage from './components/MatchPage';

const routes = [
  <Route key='/' path='/' component={App} />,
  <Route key='challenge' path='/challenge/:hash' component={MatchPage} />
];

export default routes;