import React from 'react';
import VerticalTally from './VerticalTally';
import '../stylesheets/Tally.css'

class Tally extends React.Component {
  render() {
    return(
      <div>
        <VerticalTally alignment={'left'} tally={this.props.tally[0]} />
        <div className='divider'>
          <div className='inner'>
          </div>
        </div>
        <VerticalTally alignment={'right'} tally={this.props.tally[1]} />
      </div>
    )
  }
}

export default Tally;