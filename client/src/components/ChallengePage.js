import React from 'react';
import GameContainer from './GameContainer';
import Tally from './Tally';
import '../stylesheets/ChallengePage.css';


class ChallengePage extends React.Component {
  render() {
    return(
      <div id='challenge-page' className='container-fluid'>
        <div className='row challenge-header'>
          <h1 className='col-md-12 title'>{this.props.challengeData.challenge.category}</h1>
          <h2 className='col-md-12 description'>{this.props.challengeData.challenge.description}</h2>
          <h4 className='col-md-12 type'>{this.props.challengeData.challenge.type}</h4>
          <h6 className='col-md-12 instructions'>Instructions: Click the number to check-in</h6>
        </div>
        <div className='container matchup'>
          <div className='col-md-5'>
            <GameContainer
              challengeData={this.props.challengeData.users[0]}
              onUpdateTally={this.props.onUpdateTally}
              currentUserId={this.props.currentUserId}
              side={'left'}
            />
          </div>
          <div className='col-md-2'>
            <Tally
              tally={[this.props.challengeData.users[0].tally, this.props.challengeData.users[1].tally]}
            />
          </div>
          <div className='col-md-5'>
            <GameContainer
              challengeData={this.props.challengeData.users[1]}
              onUpdateTally={this.props.onUpdateTally}
              currentUserId={this.props.currentUserId}
              side={'right'}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ChallengePage;