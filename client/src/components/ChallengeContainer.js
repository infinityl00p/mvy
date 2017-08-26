import React from 'react';
import axios from 'axios';
import base62 from 'base62';
import ChallengePage from './ChallengePage';

const ROOT_URL = 'http://localhost:3001/';

class ChallengeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateUserTally = this.updateUserTally.bind(this);
    this.getTodaysDate = this.getTodaysDate.bind(this);

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
    var challengeId = base62.decode(this.props.params.hash);
    let userChallenge = {};
    userChallenge.users = [];

    axios.get(ROOT_URL + 'challenges/' + challengeId)
      .then((response) => {
        userChallenge.challenge = {
            id: challengeId,
            category: response.data.category,
            description: response.data.description,
            type: response.data.type
          }

        return axios.get(ROOT_URL + 'challenges/' + challengeId + '/users');
    }).then((response) => {
      userChallenge.users.push({ id: response.data.users[0] }, {id: response.data.users[1]})

        return axios.get(ROOT_URL + 'users/' + userChallenge.users[0].id);
    }).then((response) => {
      userChallenge.users[0].name = response.data[0].name;

      return axios.get(ROOT_URL + 'users/' + userChallenge.users[1].id);
    }).then((response) => {
      userChallenge.users[1].name = response.data[0].name;

      return axios.get(ROOT_URL + 'challenges/' + userChallenge.challenge.id + '/users/' + userChallenge.users[0].id);
    }).then((response) => {
      userChallenge.users[0].tally = response.data[0].tally;
      userChallenge.users[0].lastDate = response.data[0].lastDate;

      return axios.get(ROOT_URL + 'challenges/' + userChallenge.challenge.id + '/users/' + userChallenge.users[1].id);
    }).then((response) => {
      userChallenge.users[1].tally = response.data[0].tally;
      userChallenge.users[1].lastDate = response.data[0].lastDate;

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
      return axios.post('/challenges/' + this.state.challenge.id + '/users/' + userId, {
        today: today
      })
        .then(() => {
          var users = this.state.users;
          users[userId-1].tally = users[userId-1].tally + 1;
          users[userId-1].lastDate = today;
          this.setState({
            users: users
          })
        });
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
        />
      </div>
    )
  }
}

export default ChallengeContainer;