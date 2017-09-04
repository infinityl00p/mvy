import React from 'react';
import { Button } from 'react-bootstrap';
import base62 from 'base62';
import ChallengeModal from './ChallengeModal';
import ChallengeList from './ChallengeList';
import '../stylesheets/Dashboard.css';

const api = require('../utils/api');
const BROWSER_URL = 'http://localhost:3000/';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.toggleShowModal = this.toggleShowModal.bind(this);
    this.createChallenge = this.createChallenge.bind(this);

    this.state = {
      showModal : false,
      challengeUrl: null,
      challenges: [],
      pendingChallenges: [],
    };
  }

  componentDidMount() {
    api.getUserChallenges(this.props.userId)
    .then((challenges) => {
      this.setState({
        challenges: challenges
      });
    })
  }

  createChallenge(challenge) {
    return api.CreateChallenge(challenge)
    .then((cid) => {
      var newChallenge = {
        id: cid,
        category: challenge.category,
        description: challenge.description,
        type: challenge.type
      }

      var pendingChallenges = [...this.state.pendingChallenges, newChallenge];
      this.setState({
        challengeUrl: BROWSER_URL + 'challenge/' + base62.encode(cid),
        pendingChallenges: pendingChallenges
      });
    })
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
        <ChallengeList challenges={this.state.challenges} pendingChallenges={this.state.pendingChallenges} />
      </div>
    );
  }
}

export default Dashboard;