import React from 'react';
import { Button } from 'react-bootstrap';
import ChallengeModal from './ChallengeModal';
import '../stylesheets/ChallengeDashboard.css';

class ChallengeDashboard extends React.Component {
  constructor() {
    super();

    this.toggleShowModal = this.toggleShowModal.bind(this);

    this.state = {
      showModal : false
    };
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
          onCreate={this.props.onCreate}
        />
      </div>
    );
  }
}

export default ChallengeDashboard;