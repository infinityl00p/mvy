import React from 'react';
import axios from 'axios';
import base62 from 'base62';
import '../stylesheets/MatchPage.css';

const ROOT_URL = 'http://localhost:3001/';

class MatchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {
        category: null,
        description: null,
        type: null
      }
    }
  }

  componentDidMount() {
    var challengeId = base62.decode(this.props.params.hash);

    axios.get(
      ROOT_URL + 'challenges/' + challengeId
    ).then((response) => {
      this.setState({
        challenge: {
          category: response.data.category,
          description: response.data.description,
          type: response.data.type
        }
      });
    })
  }

  render() {
    return(
      <div className='challenge-header'>
        <h1 className='title'>{this.state.challenge.category}</h1>
        <h1 className='description'>{this.state.challenge.description}</h1>
        <h1 className='type'>{this.state.challenge.type}</h1>
      </div>
    )
  }
}

export default MatchPage;