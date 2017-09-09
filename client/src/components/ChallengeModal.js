import React from 'react';
import { Modal, Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';


class ChallengeModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderOpponentList = this.renderOpponentList.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    var category = e.target[0].value;
    var description = e.target[1].value;
    var type = e.target[2].value;
    var opponent = e.target[3].value;
    var stakes = e.target[4].value;

    if (category && description && type && stakes && stakes < 1000) {
      var challenge = {
        category: category,
        description: description,
        type: type,
        opponent: opponent,
        stakes: stakes
      }

      //TODO: Error handle if any of the challenge parameters are left empty
      this.props.toggleShowModal();
      this.props.onCreate(challenge);
    } else {
      alert("Warning: Please fill all required fields");
    }
  }

  renderOpponentList() {
    if (this.props.opponents) {
      const userArray = this.props.opponents.map((user) => {
        return(<option key={user.id} value={user.id}>{user.name}</option>)
      })

    return userArray;
    }

    return;
  }

  render() {
    return(
      <div className='challenge-modal'>
        <Modal show={this.props.showModal} onHide={this.props.toggleShowModal}>
          <Modal.Header closeButton={true}>
            <Modal.Title>Create a Challenge</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formCategory">
              <Col componentClass={ControlLabel} sm={2}>
                Category
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Eg. Wellness" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formDescription">
              <Col componentClass={ControlLabel} sm={2}>
                Description
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Eg. Meditate for 20 minutes" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formType">
              <Col componentClass={ControlLabel} sm={2}>
                Type
              </Col>
              <Col sm={10}>
                <FormControl componentClass="select" placeholder="select">
                  <option>First to 30 days</option>
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="formType">
              <Col componentClass={ControlLabel} sm={2}>
                Opponent
              </Col>
              <Col sm={10}>
                <FormControl componentClass="select" placeholder="select">
                  {this.renderOpponentList()}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="formDescription">
            <Col componentClass={ControlLabel} sm={2}>
              Stakes ($)
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Value must be less than 1000" />
            </Col>
          </FormGroup>
            <FormGroup>
              <Col smOffset={9} sm={10}>
                <Button type="submit">
                  Shake on it
                </Button>
              </Col>
            </FormGroup>
          </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}



export default ChallengeModal;