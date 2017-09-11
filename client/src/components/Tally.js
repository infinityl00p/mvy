import React from 'react';
import '../stylesheets/Tally.css';

class Tally extends React.Component {
  renderTallyLine() {
    var tallyArray = []

    for (var i = 1; i <= this.props.tally; i++) {
      tallyArray.push(
        <tr key={i}>
          <td key={i}>X</td>
        </tr>
      )
    }

    return tallyArray;
  }

  render() {
    var verticalTally = "vertical-tally"
    var alignmentClass = verticalTally + " " + this.props.alignment;
    return(
      <div className={alignmentClass}>
        <table>
          <tbody>
            {this.renderTallyLine()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Tally;