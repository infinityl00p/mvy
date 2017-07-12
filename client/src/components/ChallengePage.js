import React from 'react';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/';

class ChallengePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challengeText: ''
    };

    var challengeId = this.props.params.id;

    axios.get(
      ROOT_URL + 'challenges/' + challengeId
    ).then((response) => {
      this.setState({ challengeText: response.data.challengeText });
    });
  }
  render() {
    return(
      <h1>challenge #: {this.state.challengeText}</h1>
    );
  }
}

export default ChallengePage;