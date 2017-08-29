import React from 'react';
import { Route } from 'react-router';
import App from './App';
import SignIn from './components/SignIn';
import ChallengeContainer from './components/ChallengeContainer';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/';

function signedIn() {
  axios.get(ROOT_URL + 'checkAuth')
    .then((response) => {
      console.log(response);
    });
}

function requireAuth(nextState, replace) {
  if (!signedIn()) {
    replace({
      pathname: '/signin'
    })
  }
}

const routes = [
  <Route key='/' path='/' component={App} onEnter={requireAuth}/>,
  <Route key='signin' path='/signin' component={SignIn} />,
  <Route key='challenge' path='/challenge/:hash' component={ChallengeContainer} onEnter={requireAuth}/>
];

export default routes;