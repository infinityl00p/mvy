import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';
import '../stylesheets/SignIn.css'

const api = require('../utils/api');

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);

    this.state = {
      password: '',
      showPassword: 'password'
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var email = e.target.email.value;
    var password = e.target.password.value;

    if (email && password) {
      api.SignIn(email, password)
      .then((uid) => {
        if(uid) {
          this.props.setUserData(uid);
        } else {
          alert("Invalid email or password");
        }
      })
    } else {
      alert("Email and Password required");
    }
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  toggleShowPassword() {
    if(this.state.showPassword === 'password') {
      this.setState({
        showPassword: 'input'
      })
    } else {
      this.setState({
        showPassword: 'password'
      })
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
              type={this.state.showPassword}
              placeholder='*******'
              value={this.state.password}
              onChange={this.updatePassword}
              />
          </FormGroup>
          <Checkbox onChange={this.toggleShowPassword}>
            Show Password
          </Checkbox>
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