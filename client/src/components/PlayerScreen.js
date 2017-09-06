import React from 'react';
import { Button } from 'react-bootstrap';
import '../stylesheets/PlayerScreen.css';

class PlayerScreen extends React.Component {
  constructor() {
    super();

    this.renderButton = this.renderButton.bind(this);
  }

  renderButton() {
    if(this.props.data.challengeData.id === this.props.currentUserId) {
      return(
        <Button onClick={this.props.onClick}>I completed my daily challenge</Button>
      )
    }

    return;
  }

  render() {
    return(
      <div className='player-screen'>
        <h2 className='points-title'>Points</h2>
        <p className='points'>{this.props.data.challengeData.tally}</p>
        {this.renderButton()}
        <p className='name'>{this.props.data.challengeData.name}</p>
      </div>
    )
  }
}

export default PlayerScreen;