import React from 'react';
import { Route } from 'react-router';
import App from './App';
import SignIn from './components/SignIn';
import ChallengeContainer from './components/ChallengeContainer';

const routes = [
  <Route key='/' path='/' component={App} />,
  <Route key='signin' path='/signin' component={SignIn} />,
  <Route key='challenge' path='/challenge/:hash' component={ChallengeContainer} />
];

export default routes;