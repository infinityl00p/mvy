import React from 'react';
import { Modal, Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

class ChallengeModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    var challenge = {
      category: e.target[0].value,
      description: e.target[1].value,
      type: e.target[2].value
    }

    this.props.toggleShowModal();
    this.props.handleSubmit(challenge);
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
                <FormControl type="text" placeholder="Eg. Exercise, Education, Diet, Discipline" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formDescription">
              <Col componentClass={ControlLabel} sm={2}>
                Description
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Describe the challenge in one line" />
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
            <FormGroup>
              <Col smOffset={9} sm={10}>
                <Button type="reset">
                  Clear
                </Button>
                <Button type="submit">
                  Submit
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