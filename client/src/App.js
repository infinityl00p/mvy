import React from 'react';
import axios from 'axios';
import ChallengeDashboard from './components/ChallengeDashboard';

const ROOT_URL = 'http://localhost:3001/';

class App extends React.Component {
  onCreate(challenge) {
    axios.post(
      ROOT_URL + 'challenges',
      { challenge: challenge }
    );
  }

  render() {
    return (
      <div className='App'>
        <ChallengeDashboard onCreate={this.createChallenge} />
      </div>
    );
  }
}

export default App;
