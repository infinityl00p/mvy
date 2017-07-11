import React from 'react';
import { Button } from 'react-bootstrap';

import CreateChallengeModal from './CreateChallengeModal';

class CreateChallengePage extends React.Component {
  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createChallenge = this.createChallenge.bind(this);

    this.state = {
      showModal: false
    }
  }

  createChallenge(challengeText) {
    this.closeModal();
    this.props.onCreate(challengeText);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return(
      <div id='create-challenge-page'>
        <Button onClick={this.openModal}>Create a challenge</Button>
        <CreateChallengeModal
          showModal={this.state.showModal}
          closeModal={this.closeModal}
          onCreate={this.createChallenge}
        />
      </div>
    );
  }
}

export default CreateChallengePage;