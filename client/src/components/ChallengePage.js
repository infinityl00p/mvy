import React from 'react';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/';

class ChallengePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: null,
      temp: this.props.params.id
    };

    var challengeId = this.props.params.id;
    // const request = axios.get(
    //   ROOT_URL + 'challenges/' + challengeId
    // ).then((response) => {
    //   this.setState({ challenge: response.data.challenge });
    // });
  }
  render() {
    return(
      <h1>challenge #: {this.state.temp}</h1>
    );
  }
}

export default ChallengePage;