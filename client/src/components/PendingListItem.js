import React from 'react';
import '../stylesheets/PendingListItem.css';


class PendingListItem extends React.Component {
  render() {
    const {challenge} = this.props;
    return(
      <span className='col-md-12 pending-list-item'>
        <li className='col-md-5 text'>
          Stakes - ${challenge.stakes}<br />
          Description - {challenge.description}<br />
          Opponent - {this.props.opponent}
        </li>
        <span className='col-md-7'>
          {this.props.renderButtons(challenge.id, this.props.index)}
        </span>
      </span>
    )
  }
}

export default PendingListItem;