import React from 'react';
import { Button } from 'react-bootstrap';
import '../stylesheets/PlayerScreen.css';

class PlayerScreen extends React.Component {
  render() {
    return(
      <div className='player-screen'>
        <h2 className='points-title'>Points</h2>
        <p className='points'>{this.props.data.tally}</p>
        <Button onClick={this.props.onClick}>I completed my daily challenge</Button>
        <p className='name'>{this.props.data.name}</p>
      </div>
    )
  }
}

export default PlayerScreen;