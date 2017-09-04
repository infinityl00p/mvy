import React from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

const api = require('../utils/api');

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var email = e.target.email.value;
    var password = e.target.password.value;

    if (email && password) {
      api.SignIn(email, password)
      .then((uid) => {
        this.props.login(uid);
      })
    } else {
      alert("Email and Password required");
    }
  }

  render() {
    return(
      <div className='col-md-12'>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="email">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={5}>
              <FormControl type="email" placeholder="name@example.com" />
            </Col>
          </FormGroup>
          <FormGroup controlId="password">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={5}>
              <FormControl type="password" placeholder="*******" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={5} sm={10}>
              <Button type="reset">
                Clear
              </Button>
              <Button type="submit">
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default SignIn;