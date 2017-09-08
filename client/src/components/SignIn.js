import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import '../stylesheets/SignIn.css'

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
        this.props.signin(uid);
        this.props.setUserData(uid);
      })
    } else {
      alert("Email and Password required");
    }
  }

  render() {
    return(
      <div className='container signin'>
        <Form onSubmit={this.handleSubmit} className='col-md-4 col-md-offset-4 form'>
          <h1 className='title'>Sign In</h1>
          <FormGroup controlId='email'>
            <ControlLabel>
              <span className='glyphicon glyphicon-user' />
              Email
            </ControlLabel>
            <FormControl
              type='email'
              placeholder='email'
              autoFocus
              />
            </FormGroup>
          <FormGroup controlId='password'>
            <ControlLabel>
              <span className='glyphicon glyphicon-lock' />
              Password
            </ControlLabel>
            <FormControl
              type='password'
              placeholder='*******'
              />
          </FormGroup>
          <FormGroup>
          <Button
            block
            type='submit'
          >
            Sign in
          </Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default SignIn;