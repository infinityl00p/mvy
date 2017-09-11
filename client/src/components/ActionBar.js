import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/ActionBar.css';


class ActionBar extends React.Component {
  render() {
    return(
      <div className='action-bar'>
        <span className='welcome-message'>
          Welcome {this.props.name}!
        </span>
        <span className='routes'>
          <Link to='/' className='link'>Dashboard</Link>
        </span>
        <span className='action' onClick={this.props.signout}>
          Sign Out
        </span>
      </div>
    )
  }
}

export default ActionBar