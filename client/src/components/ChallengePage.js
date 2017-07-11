import React from 'react';

class ChallengePage extends React.Component {
  render() {
    return(
      <h1>challenge #: {this.props.challengeText}</h1>
    );
  }
}

export default ChallengePage;