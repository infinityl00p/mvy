import React from 'react';
import '../stylesheets/PlayerScreen.css';

class PlayerScreen extends React.Component {
  constructor() {
    super();

    this.renderPoints= this.renderPoints.bind(this);
  }

  renderPoints() {
    if(this.props.data.challengeData.id === this.props.currentUserId) {
      return(
        <p className='points button' onClick={this.props.onClick}>{this.props.data.challengeData.tally}</p>
      )
    }
    return (
      <p className='points'>{this.props.data.challengeData.tally}</p>
    );
  }

  render() {
    return(
      <div className={this.props.side === 'left' ? 'player-screen left' : 'player-screen right'}>
        <h2 className='points-title'>Points</h2>
        {this.renderPoints()}
        <p className='name'>{this.props.data.challengeData.name}</p>
      </div>
    )
  }
}

export default PlayerScreen;