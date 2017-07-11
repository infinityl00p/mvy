import React from 'react';

import CreateChallengePage from './components/CreateChallengePage';

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
    this.setState({ challenges: [...this.state.challenges, challengeText] });
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
