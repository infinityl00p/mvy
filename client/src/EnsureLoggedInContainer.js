import React from 'react';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/';

class EnsureLoggedInContainer extends React.Component {
  constructor() {
    super();


  }

  render() {
    if (isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

