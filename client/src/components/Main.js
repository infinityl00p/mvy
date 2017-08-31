import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ChallengeContainer from './ChallengeContainer';


class Main extends React.Component{
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={() => (
            <Dashboard onCreate={this.createChallenge} userId={this.props.userId}/>
          )} />
          <Route key='challenge' exact path='/challenge/:hash' component={ChallengeContainer} />
        </Switch>
      </main>
    )
  }
}

export default Main;
