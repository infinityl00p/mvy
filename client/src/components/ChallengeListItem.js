import React from 'react';
import { Link } from 'react-router-dom';
import base62 from 'base62';


class ChallengeListItem extends React.Component {
  getUrlPath() {
    const {id} = this.props.challenge;
    const hashId = base62.encode(id);
    const urlPath = '/challenge/' + hashId;

    return urlPath;
  }

  render() {
    return(
      <div>
        <Link to={this.getUrlPath()}>{this.props.challenge.description}</Link>
      </div>
    )
  }
}

export default ChallengeListItem;