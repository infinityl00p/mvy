import React from 'react';
import Tally from './Tally';
import '../stylesheets/TallyLine.css'

class TallyLine extends React.Component {
  render() {
    return(
      <div>
        <Tally alignment={'left'} tally={this.props.tally[0]} />
        <div className='divider'>
          <div className='inner'>
          </div>
        </div>
        <Tally alignment={'right'} tally={this.props.tally[1]} />
      </div>
    )
  }
}

export default TallyLine;