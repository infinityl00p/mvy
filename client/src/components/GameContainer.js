import React from 'react';
import PlayerScreen from './PlayerScreen';

class GameContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  //TODO: handle button click here
  handleClick() {
    this.props.onUpdateTally(this.props.challengeData.id);
  }

  render() {
    return(
      <div>
        <PlayerScreen
          data={this.props}
          onClick={this.handleClick}
          currentUserId={this.props.currentUserId}
        />
      </div>
    )
  }
}

export default GameContainer;