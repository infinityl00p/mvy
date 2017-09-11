import React from 'react';
import { Button } from 'react-bootstrap';
import ChallengeListItem from './ChallengeListItem';
import PendingListItem from './PendingListItem';
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
    this.getOpponentName = this.getOpponentName.bind(this);
  }

  renderChallenges() {
    var { challenges } = this.props.userData;

    if(challenges && challenges.length) {
      return this.props.userData.challenges.map((challenge, index) => {
        return (
          <span key={index}>
            <ChallengeListItem key={challenge.id} challenge={challenge} />
          </span>
        )
      })
    } else {
      return (
        <p className='text'>No Challenges</p>
      );
    }
  }

  renderButtons(cid, index) {
    if (this.props.userData.userId === this.props.userData.pendingChallenges[index].opponentid) {
      return (
        <span className='pending-button'>
          <Button
            className='accept'
            type='button'
            onClick={() => this.acceptChallenge(cid, index)}
            bsSize='small'
          >
            Shake on it
          </Button>
          <Button
            className='decline'
            type='button'
            onClick={() => this.declineChallenge(cid, index)}
            bsSize='small'
          >
            Decline
          </Button>
        </span>
      );
    }
  }

  renderPendingChallenges() {
    var { pendingChallenges } = this.props.userData;

    if(pendingChallenges && pendingChallenges.length) {
      return this.props.userData.pendingChallenges.map((challenge, index) => {
        var opponentName = this.getOpponentName(challenge);
        return (
          <PendingListItem
            key={index}
            challenge={challenge}
            index={index}
            renderButtons={this.renderButtons}
            opponent={opponentName}
          />
        );
      });
    } else {
      return (
        <p className='text'>No pending Challenges</p>
      );
    }
  }

  getOpponentName(challenge) {
    const {ownerid, opponentid} = challenge;
    let opponentName;

    this.props.userData.opponents.forEach((opponent) => {
      if(opponent.id === Number(ownerid)) {
        opponentName = opponent.name;
      } else if (opponent.id === Number(opponentid)) {
        opponentName = opponent.name;
      }
    })

    return opponentName;
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
      <div className='col-md-12'>
        <ol className='col-md-4'>
          <h1 className='title'>Open Challenges</h1>
          <div className='list'>
            {this.renderChallenges()}
          </div>
        </ol>
        <ol className='col-md-5 col-md-offset-3'>
          <h1 className='title'>Pending Challenges</h1>
          <div className='list'>
            {this.renderPendingChallenges()}
          </div>
        </ol>
      </div>
    )
  }
}

export default ChallengeList;