import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    number: 32,
  }
  onNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({ number: value });
    this.props.updateEvents(null, null, value);
  }
  render() {
    return (
      <div className="NumberOfEvents">
        Show &nbsp;
        <input type="number" className="number-of-events" placeholder="32" onChange={this.onNumberChanged} value={this.state.number}>
        </input> &nbsp;
        events
      </div>
    );
  }
}

export default NumberOfEvents;