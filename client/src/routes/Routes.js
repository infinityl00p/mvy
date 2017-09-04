import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import ChallengeContainer from '../components/ChallengeContainer';


class Main extends React.Component{
  render() {
    return (
      <Switch>
        <Redirect from='/login' to='/'/>
        <Route exact path='/' render={() => (
          <Dashboard onCreate={this.createChallenge} userId={this.props.userId}/>
        )} />
        <Route key='challenge' exact path='/challenge/:hash' component={ChallengeContainer} />
      </Switch>
    )
  }
}

export default Main;
