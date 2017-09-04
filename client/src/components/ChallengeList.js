import React from 'react';
import ChallengeListItem from './ChallengeListItem';

class ChallengeList extends React.Component {
  renderPendingChallenges() {
    if(this.props.pendingChallenges) {
      return this.props.pendingChallenges.map((challenge, index) => {
        return (
          <li key={index}><ChallengeListItem key={challenge.id} challenge={challenge} /></li>
        )
      })
    } else {
      return (
        <p>None</p>
      )
    }
  }

  render() {
    return(
      <div>
        <ol>
          <strong>Challenges</strong>
          {
            this.props.challenges.map((challenge, index) => {
              return (
                <li key={index}><ChallengeListItem key={challenge.id} challenge={challenge} /></li>
              )
            })
          }
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