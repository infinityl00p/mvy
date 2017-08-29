import React from 'react';
import axios from 'axios';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

const ROOT_URL = 'http://localhost:3001/';

class SignIn extends React.Component {
handleSubmit(e) {
  e.preventDefault();

  if (e.target.email.value && e.target.password.value) {
    return axios.post(ROOT_URL + 'signin', {
      email: e.target.email.value,
      password: e.target.password.value
    }).then((response) => {
      console.log(response);
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