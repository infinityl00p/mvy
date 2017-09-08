import React from 'react';
import { Button } from 'react-bootstrap';
import ChallengeModal from './ChallengeModal';
import ChallengeList from './ChallengeList';
import '../stylesheets/Dashboard.css';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.toggleShowModal = this.toggleShowModal.bind(this);

    this.state = {
      showModal : false,
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
        <ChallengeModal
          showModal={this.state.showModal}
          toggleShowModal={this.toggleShowModal}
          onCreate={this.props.onCreate}
          opponents={this.props.userData.opponents}
        />
        <ChallengeList
          updatePendingChallenges={this.props.onUpdate}
          userData={this.props.userData}
        />
        <Button className='challenge-button' onClick={this.toggleShowModal}>
          Create a Challenge
        </Button>
      </div>
    );
  }
}

export default Dashboard;