import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import ChallengeContainer from '../components/ChallengeContainer';


class Routes extends React.Component{
  render() {
    console.log("in routes");
    console.log("props: " + this.props);
    return (
      <Switch>
        <Redirect from='/signin' to='/'/>
        <Route key='/' exact path='/' render={() => (
          <Dashboard
            onCreate={this.props.createChallenge}
            userData={this.props.userData}
            onUpdate={this.props.updatePendingChallenges}
            signout={this.props.signout}
          />
        )} />
        <Route key='challenge' exact path='/challenge/:hash' render={(props) => (
          <ChallengeContainer
            userId={this.props.userData.userId}
            {...props}
          />
        )} />
      </Switch>
    )
  }
}

export default Routes;
