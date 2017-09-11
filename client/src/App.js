import React from 'react';
import Routes from './routes/Routes';
import SignIn from './components/SignIn';
import ActionBar from './components/ActionBar';
import Loading from './components/Loading';
import './stylesheets/App.css';

const api = require('./utils/api');

class App extends React.Component {
  constructor() {
    super();

    this.setUserData = this.setUserData.bind(this);
    this.updateChallenges = this.updateChallenges.bind(this);
    this.createChallenge = this.createChallenge.bind(this);
    this.signout = this.signout.bind(this);

    this.state = {
      isLoading: true,
      auth: {
        loggedIn: false,
      },
      userData: {
        userId: null,
        name: null,
        challenges: [],
        pendingChallenges: [],
        opponents: []
      }
    }
  }

  componentWillMount() {
    api.CheckAuth()
    .then((response) => {
      this.setUserData(response.userId);
    })
    .catch((err) => {
      return this.setState({
        isLoading: false,
        auth: {
          loggedIn: false,
        },
        userData: null
      })
    })
  }

  signout() {
    api.SignOut()
    .then((response) => {
      this.setState({
        auth: {
          loggedIn: false
        },
        userData: {
          userId: null,
          challenges: [],
          pendingChallenges: [],
          opponents: []
        }
      })
    })
  }

  setUserData(userId) {
    let userData = {}

    api.getUserChallenges(userId)
    .then((challenges) => {
      userData.challenges = challenges;
    })

    api.getPendingChallenges(userId)
    .then((pendingChallenges) => {
      userData.pendingChallenges = pendingChallenges;
    })

    api.getUserName(userId)
    .then((name) => {
      userData.name = name;
    })

    api.getOpponents(userId)
    .then((opponents) => {
      userData.opponents = opponents;
      userData.userId = userId;

      this.setState({
        auth: {
          loggedIn: true,
          userId: userId
        },
        userData: userData,
        isLoading: false
      })
    })
  }

  updateChallenges(index, action) {
    var pendingChallenges = this.state.userData.pendingChallenges;
    var challenges = this.state.userData.challenges;

    if (action === 'add') {
      challenges.push(pendingChallenges.splice(index, 1)[0]);
    } else if (action === 'remove') {
      //TODO: fix this
      pendingChallenges.splice(index, 1);
    }

    this.setState({
      userData: {
        name: this.state.userData.name,
        userId: this.state.userData.userId,
        pendingChallenges: pendingChallenges,
        challenges: challenges,
        opponents: this.state.userData.opponents,
        stakes: this.state.userData.stakes
      }
    });
  }

  createChallenge(challenge) {
    challenge.owner = this.state.userData.userId;

    return api.CreateChallenge(challenge)
    .then((cid) => {
      var newChallenge = {
        category: challenge.category,
        description: challenge.description,
        type: challenge.type,
        ownerid: this.state.userData.userId,
        opponentid: challenge.opponent,
        stakes: challenge.stakes
      }

      var pendingChallenges = [...this.state.userData.pendingChallenges, newChallenge];

      this.setState({
        userData: {
          name: this.state.userData.name,
          userId: this.state.userData.userId,
          pendingChallenges: pendingChallenges,
          challenges: this.state.userData.challenges,
          opponents: this.state.userData.opponents,
          stakes: this.state.userData.stakes
        }
      });
    })
  }

  render() {
    if (this.state.isLoading) {
      return(
        <Loading />
      )
    }
    if (this.state.auth.loggedIn && this.state.isLoading === false) {
      return(
        <div>
          <ActionBar
            signout={this.signout}
            name={this.state.userData.name}
          />
          <Routes
            userData={this.state.userData}
            updatePendingChallenges={this.updateChallenges}
            createChallenge={this.createChallenge}
          />
        </div>
      );
    }
      return(
        <SignIn
          setUserData={this.setUserData}
        />
      );
    }
}

export default App;
