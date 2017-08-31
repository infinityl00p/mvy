import React from 'react';
import { Route } from 'react-router';
import App from './App';
import SignIn from './components/SignIn';
import ChallengeContainer from './components/ChallengeContainer';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/';

function signedIn() {
  axios(ROOT_URL + 'checkauth', {
    method: "get",
    withCredentials: true,
  })
  .then((response) => {
    if (response.status === 200) {
      console.log(response);
    }
  })
  .catch((err) => {
    console.log(err);
  })
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