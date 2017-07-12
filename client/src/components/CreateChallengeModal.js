import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class CreateChallengeModal extends React.Component {
  constructor() {
    super();

    this.handleChallengeChange = this.handleChallengeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      challengeText: ''
    };
  }

  handleChallengeChange(e) {
    this.setState({ challengeText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onCreate(this.state.challengeText);
    this.setState({ challengeText: '' });
  }

  render() {
    return(
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header>
          <Modal.Title>Create a Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label className='create-challenge-title'>Create a new challenge</label>
              <input
                type='text'
                className='form-control challenge-input'
                value={this.state.challengeText}
                onChange={this.handleChallengeChange}
                placeholder='Enter a new challenge'
                ref='challenge'
              />
            </div>
          </form>
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit}>Create</Button>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateChallengeModal;