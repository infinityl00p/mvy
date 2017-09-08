import React from 'react';
import Routes from './routes/Routes';
import SignIn from './components/SignIn';
import ActionBar from './components/ActionBar';
import './stylesheets/App.css';

const api = require('./utils/api');

class App extends React.Component {
  constructor() {
    super();

    this.signin = this.signin.bind(this);
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

  signin(userId) {
    this.setUserData(userId);
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

  updateChallenges(index) {
    var pendingChallenges = this.state.userData.pendingChallenges;
    var challenges = this.state.userData.challenges;
    challenges.push(pendingChallenges.splice(index, 1)[0]);

    this.setState({
      userData: {
        name: this.state.userData.name,
        userId: this.state.userData.userId,
        pendingChallenges: pendingChallenges,
        challenges: challenges,
        opponents: this.state.userData.opponents
      }
    });
  }

  createChallenge(challenge) {
    challenge.owner = this.state.userData.userId;

    return api.CreateChallenge(challenge)
    .then((cid) => {
      var newChallenge = {
        id: cid,
        category: challenge.category,
        description: challenge.description,
        type: challenge.type,
        opponentid: challenge.opponent
      }

      var pendingChallenges = [...this.state.userData.pendingChallenges, newChallenge];

      this.setState({
        userData: {
          pendingChallenges: pendingChallenges,
          challenges: this.state.userData.challenges,
          opponents: this.state.userData.opponents,
          userId: this.state.userData.userId
        }
      });
    })
  }

  render() {
    if (this.state.isLoading) {
      return(
        <div className="sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
        </div>
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
          signin={this.signin}
          setUserData={this.setUserData}
        />
      );
    }
}

export default App;
