import React from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import base62 from 'base62';
import './stylesheets/App.css';

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
        <div id='App'>
          <Dashboard onCreate={this.createChallenge} />
          <input
            className='challenge-url'
            type='text'
            readOnly
            value={this.state.challengeUrl}
          />
        </div>
      );
    }
    return(
      <div className='App'>
        <Dashboard onCreate={this.createChallenge} />
      </div>
    );
  }
}

export default App;
