import React from 'react';
import axios from 'axios';
import ChallengeDashboard from './components/ChallengeDashboard';
import base62 from 'base62';

const ROOT_URL = 'http://localhost:3000/';

class App extends React.Component {
  constructor() {
    super();

    this.createChallenge = this.createChallenge.bind(this);

    this.state = {
      challengeUrl: null
    }
  }

  createChallenge(challenge) {
    axios.post(
      ROOT_URL + 'challenges', {
        category: challenge.category,
        description: challenge.description,
        type: challenge.type
      }).then((response) => {
      this.setState({ challengeUrl: ROOT_URL + 'challenge/' + base62.encode(response.data.insertId)});
    });
  }

  render() {
    if(this.state.challengeUrl != null) {
      return(
        <div className='App'>
          <ChallengeDashboard onCreate={this.createChallenge} />
          <input
            type="text"
            readOnly
            value={this.state.challengeUrl}
          />
        </div>
      );
    }
    return(
      <div className='App'>
        <ChallengeDashboard onCreate={this.createChallenge} />
      </div>
    );
  }
}

export default App;
