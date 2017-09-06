import React from 'react';
import base62 from 'base62';
import ChallengePage from './ChallengePage';

const api = require('../utils/api');

class ChallengeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateUserTally = this.updateUserTally.bind(this);
    this.getTodaysDate = this.getTodaysDate.bind(this);
    //don't need challenge in state, it's not going to be updated
    this.state = {
      challenge: {
        id: null,
        category: null,
        description: null,
        type: null
      },
      users: [{
        id: null,
        name: null,
        tally: null,
        lastDate: null
      }, {
        id: null,
        name: null,
        tally: null,
        lastDate: null
      }]
    }
  }

  componentDidMount() {
    var challengeId = base62.decode(this.props.match.params.hash);
    api.GetChallengeData(challengeId)
    .then((userChallenge) => {
      this.setState({
        challenge: userChallenge.challenge,
        users: userChallenge.users
      });
    })
  }

  updateUserTally(userId) {
    var today = this.getTodaysDate();
    var lastDate = new Date(this.state.users[userId-1].lastDate);

    if (today.getTime() !== lastDate.getTime()) {
      return api.CheckIn(this.state.challenge.id, userId, today)
      .then(() => {
        var users = this.state.users;
        users[userId-1].tally = users[userId-1].tally + 1;
        users[userId-1].lastDate = today;
        this.setState({
          users: users
        })
      })
    }
    alert("Already checked in for today");
  }

  getTodaysDate() {
    var today = new Date();
    today.toISOString().slice(0, 10);
    today.setHours(0,0,0,0);

    return today;
  }

  render() {
    return(
      <div>
        <ChallengePage
          challengeData={this.state}
          onUpdateTally={this.updateUserTally}
          currentUserId={this.props.userId}
        />
      </div>
    )
  }
}

export default ChallengeContainer;