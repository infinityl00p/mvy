import React from 'react';
import { Route } from 'react-router';

import App from './App';
import ChallengePage from './components/ChallengePage';

const routes = [
  <Route key='/' path='/' component={App} />,
  <Route key='challenge' path='/:id' component={ChallengePage} />
];

export default routes;