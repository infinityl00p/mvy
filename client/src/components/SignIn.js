import React from 'react';
import axios from 'axios';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

const ROOT_URL = 'http://localhost:3001/';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (e.target.email.value && e.target.password.value) {
      return axios(ROOT_URL + 'signin', {
        method: "post",
        data: {
          email: e.target.email.value,
          password: e.target.password.value
        },
        withCredentials: true
      })
      .catch((err) => {
        console.log(err);
      })
      .then((response) => {
        if (response.status === 200) {
          //TODO: redirect to dashboard
          this.props.login(response.data.userId);
        }
        //TODO: else handle invalid email or password
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