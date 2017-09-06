import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import ChallengeListItem from './ChallengeListItem';

const api = require('../utils/api');

class ChallengeList extends React.Component {
  constructor() {
    super()

    this.renderChallenges = this.renderChallenges.bind(this);
    this.renderPendingChallenges = this.renderPendingChallenges.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.acceptChallenge = this.acceptChallenge.bind(this);
    this.declineChallenge = this.declineChallenge.bind(this);
  }

  renderChallenges() {
    var { challenges } = this.props.userData;

    if(challenges && challenges.length) {
      return this.props.userData.challenges.map((challenge, index) => {
        return (
          <li key={index}><ChallengeListItem key={challenge.id} challenge={challenge} /></li>
        )
      })
    } else {
      return (
        <p>No Challenges</p>
      );
    }
  }

  renderPendingChallenges() {
    var { pendingChallenges } = this.props.userData;

    if(pendingChallenges && pendingChallenges.length) {
      return this.props.userData.pendingChallenges.map((challenge, index) => {
        return (
          <li key={index}>
            {challenge.description}
            {this.renderButtons(challenge.id, index)}
          </li>
        );
      });
    } else {
      return (
        <p>No pending Challenges</p>
      );
    }
  }

  renderButtons(cid, index) {
    if (this.props.userData.userId === this.props.userData.pendingChallenges[index].opponentid) {
      return (
        <ButtonToolbar>
          <Button type='button' onClick={() => this.acceptChallenge(cid, index)}>Accept</Button>
          <Button type='button' onClick={() => this.declineChallenge(cid, index)}>Decline</Button>
        </ButtonToolbar>
      );
    }
  }

  acceptChallenge(cid, index) {
    return api.acceptPendingChallenge(cid, this.props.userData.pendingChallenges[index].ownerid, this.props.userData.pendingChallenges[index].opponentid)
    .then((response) => {
      this.props.updatePendingChallenges(index);
    })
  }

  declineChallenge(cid, index) {
    return api.declinePendingChallenge(cid, this.props.userData.pendingChallenges[index].ownerid, this.props.userData.pendingChallenges[index].opponentid)
    .then((response) => {
      this.props.updatePendingChallenges(index);
    })
  }

  render() {
    return(
      <div>
        <ol>
          <strong>Challenges</strong>
          {this.renderChallenges()}
        </ol>
        <ol>
          <strong>Pending Challenges</strong>
          {this.renderPendingChallenges()}
        </ol>
      </div>
    )
  }
}

export default ChallengeList;