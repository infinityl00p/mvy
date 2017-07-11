import React from 'react';
import axios from 'axios';

import CreateChallengePage from './components/CreateChallengePage';

const ROOT_URL = 'http://localhost:3001/';

class App extends React.Component {
  constructor() {
    super();

    this.createChallenge = this.createChallenge.bind(this);

    this.state = {
      challenges: []
    }
  }

  createChallenge(challengeText) {
    console.log(challengeText);
    if (challengeText) {
      this.setState({ challenges: [...this.state.challenges, challengeText] });

      // const request = axios.post(
      //   ROOT_URL + 'challenges',
      //   { challengeText: challengeText }
      // );
    }
  }

  render() {
    return (
      <div className='App'>
        <CreateChallengePage onCreate={this.createChallenge} />
      </div>
    );
  }
}

export default App;
