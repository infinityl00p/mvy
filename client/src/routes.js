import React from 'react';
import { Route } from 'react-router';

import App from './App';
import ChallengeDashboard from './components/ChallengeDashboard';

const routes = [
  <Route key='/' path='/' component={App} />,
  <Route key='challenge' path='/:id' component={ChallengeDashboard} />
];

export default routes;