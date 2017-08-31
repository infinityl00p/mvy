import React from 'react';
import Main from './components/Main';
import SignIn from './components/SignIn';
import './stylesheets/App.css';

const ROOT_URL = 'http://localhost:3001/';

class App extends React.Component {
  constructor() {
    super();

    this.loggedIn = this.loggedIn.bind(this);
    this.login = this.login.bind(this);

    var loginRequest = this.loggedIn();

    this.state = {
      auth : {
        loggedIn: loginRequest.loggedIn,
        userId: loginRequest.userId
      }
    }
  }

  loggedIn() {
    var loginRequest = new XMLHttpRequest();
    loginRequest.open("GET", ROOT_URL + 'checkauth', false);
    loginRequest.withCredentials = true;
    loginRequest.send();

    if (loginRequest.status === 200) {
      var jsonResponse = JSON.parse(loginRequest.response);
      return {
        loggedIn: true,
        userId: jsonResponse.userId
      }
    } else {
      return {
        loggedIn: false,
        userId: null
      }
    }
  }

  login(userId) {
    this.setState({
      auth: {
        loggedIn: true,
        userId: userId
      }
    })
  }



  render() {
    if (this.state.auth.loggedIn) {
      return(
        <div>
          <Main userId={this.state.auth.userId} />
        </div>
      );
    }
    return (
      <SignIn login={this.login} />
    );
  }
}

export default App;
