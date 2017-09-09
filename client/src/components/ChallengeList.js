import React from 'react';
import { Button } from 'react-bootstrap';
import ChallengeListItem from './ChallengeListItem';
import '../stylesheets/ChallengeList.css';

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
          <span key={index}>
            <li key={index} className='text'>
              <ChallengeListItem key={challenge.id} challenge={challenge} />
            </li>
          </span>
        )
      })
    } else {
      return (
        <p className='text'>No Challenges</p>
      );
    }
  }

  renderPendingChallenges() {
    var { pendingChallenges } = this.props.userData;

    if(pendingChallenges && pendingChallenges.length) {
      return this.props.userData.pendingChallenges.map((challenge, index) => {
        return (
          <span key={index}>
            <li key={index} className='text'>
              ${challenge.stakes} - {challenge.description}
              {this.renderButtons(challenge.id, index)}
            </li>
          </span>
        );
      });
    } else {
      return (
        <p className='text'>No pending Challenges</p>
      );
    }
  }

  renderButtons(cid, index) {
    if (this.props.userData.userId === this.props.userData.pendingChallenges[index].opponentid) {
      return (
        <span className='pending-button'>
          <Button type='button' onClick={() => this.acceptChallenge(cid, index)} bsSize='small'>Shake on it</Button>
          <Button type='button' onClick={() => this.declineChallenge(cid, index)} bsSize='small'>Decline</Button>
        </span>
      );
    }
  }

  acceptChallenge(cid, index) {
    return api.acceptPendingChallenge(cid, this.props.userData.pendingChallenges[index].ownerid, this.props.userData.pendingChallenges[index].opponentid)
    .then((response) => {
      this.props.updatePendingChallenges(index , 'add');
    })
  }

  declineChallenge(cid, index) {
    return api.declinePendingChallenge(cid, this.props.userData.pendingChallenges[index].ownerid, this.props.userData.pendingChallenges[index].opponentid)
    .then((response) => {
      this.props.updatePendingChallenges(index, 'remove');
    })
  }

  render() {
    return(
      <div className='col-md-12 row'>
        <ol className='col-md-4'>
          <h1 className='title'>Open Challenges</h1>
          {this.renderChallenges()}
        </ol>
        <ol className='col-md-4 col-md-offset-4'>
          <h1 className='title'>Pending Challenges</h1>
          {this.renderPendingChallenges()}
        </ol>
      </div>
    )
  }
}

export default ChallengeList;