import React from 'react';
import axios from 'axios';
import ChallengeDashboard from './components/ChallengeDashboard';

const ROOT_URL = 'http://localhost:3001/';

class App extends React.Component {
  createChallenge(challenge) {
    axios.post(
      ROOT_URL + 'challenges',
      {
        category: challenge.category,
        description: challenge.description,
        type: challenge.type
      }
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
