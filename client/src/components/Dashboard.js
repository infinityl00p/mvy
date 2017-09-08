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
      <div className='challenge-dashboard container'>
        <div className='row col-md-offset-4 col-md-4'>
          <div>
            <h2 className='title'>Instructions:</h2><p className='text'>Create a challenge which you will complete <u>once per day</u> against
            a friend of your choosing. Once your friend has accepted the challenge it will move from Pending Challenges to
            Challenges. View your challenge(s), and check in once per day. The first to 30 total check-ins
            wins!</p>
            <Button className='challenge-button' onClick={this.toggleShowModal} bsSize='large'>
              Create a Challenge
            </Button>
          </div>
        </div>
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
      </div>
    );
  }
}

export default Dashboard;