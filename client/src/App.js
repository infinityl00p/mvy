import React from 'react';
import Routes from './routes/Routes';
import SignIn from './components/SignIn';
import './stylesheets/App.css';

const api = require('./utils/api');

class App extends React.Component {
  constructor() {
    super();

    this.login = this.login.bind(this);

    this.state = {
      auth : {
        loggedIn: false,
        userId: null
      }
    }
  }

  componentWillMount() {
    api.CheckAuth()
    .then((response) => {
      this.setState({
        auth: {
          loggedIn: true,
          userId: response.userId
        }
      })
    })
    .catch((err) => {
      this.setState({
        auth: {
          loggedIn: false,
          userId: null
        }
      })
    })
  }

  login(userId) {
    this.setState({
      auth: {
        loggedIn: true,
        userId: userId
      }
    });
  }



  render() {
    if (this.state.auth.loggedIn) {
      return(
        <div>
          <Routes userId={this.state.auth.userId} />
        </div>
      );
    }
    return (
      <SignIn login={this.login} />
    );
  }
}

export default App;
