import React, { Component } from "react";

import { WarningAlert, ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    number: 32,
  }

  componentDidMount() {
    //check if users is offline, if so show alert
    if (!navigator.onLine) {
      this.setState({ warningText: 'You are offline. Events shown are pulled from cache.' });
    } else {
      //if online show/do nothing
      this.setState({ warningText: '', });
    }
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
        <WarningAlert text={this.state.warningText} />
        Show &nbsp;
        <input type="number" className="number-of-events" onChange={this.onNumberChanged} value={this.state.number}>
        </input> &nbsp;
        events
      </div>
    );
  }
}

export default NumberOfEvents;