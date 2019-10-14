import React, { Component } from "react";

import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    number: 32,
  }
  onNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    //check if number of events selected is < 1, if so show alert
    if (value < 1) {
      this.setState({ errorText: 'Number of events needs to be greater than 0. Please try again.' });
    } else {
      //if the number is greater than or equal to 1 show no error and continue
      this.props.updateEvents(null, null, value);
      this.setState({ errorText: '', });
    }



  }
  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.errorText} />
        Show &nbsp;
        <input type="number" className="number-of-events" placeholder="32" onChange={this.onNumberChanged} value={this.state.number}>
        </input> &nbsp;
        events
      </div>
    );
  }
}

export default NumberOfEvents;