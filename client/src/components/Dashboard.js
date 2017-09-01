import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import base62 from 'base62';
import ChallengeModal from './ChallengeModal';
import '../stylesheets/Dashboard.css';

const BROWSER_URL = 'http://localhost:3000/';
const ROOT_URL = 'http://localhost:3001/';


class Dashboard extends React.Component {
  constructor() {
    super();

    this.toggleShowModal = this.toggleShowModal.bind(this);
    this.createChallenge = this.createChallenge.bind(this);

    this.state = {
      showModal : false,
      challengeUrl: null
    };
  }

  createChallenge(challenge) {
    axios.post(
      ROOT_URL + 'challenges', {
        category: challenge.category,
        description: challenge.description,
        type: challenge.type
      }).then((response) => {
      this.setState({ challengeUrl: BROWSER_URL + 'challenge/' + base62.encode(response.data.insertId)});
    });
  }

  toggleShowModal() {
    this.setState({
      showModal : !this.state.showModal
    });
  }

  render() {
    return(
      <div className="challenge-dashboard">
        <Button onClick={this.toggleShowModal}>
          Create a Challenge
        </Button>
        <ChallengeModal
          showModal={this.state.showModal}
          toggleShowModal={this.toggleShowModal}
          onCreate={this.createChallenge}
        />
        {(() => {
          console.log(this.state.challengeUrl);
          if (this.state.challengeUrl) {
            return(
              <input
                className='challenge-url'
                type='text'
                readOnly
                value={this.state.challengeUrl}
              />
              )
            }
          })()
        }
      </div>
    );
  }
}

export default Dashboard;