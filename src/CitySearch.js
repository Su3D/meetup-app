import React, { Component } from 'react';

import { getSuggestions } from './api';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: []
  }

  //take value from input and update state of query to that value
  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
    getSuggestions(value).then(suggestions => {
      this.setState({ suggestions });
      //check if the list of suggestions exists, if no suggestions show alert
      if (value && suggestions.length === 0) {
        this.setState({ infoText: 'We can not find a match for that city. Please try again.' });
      } else { //if there are suggestions show/do nothing
        this.setState({ infoText: '' });
      }
    });
  }

  handleItemClicked = (value, lat, lon) => {
    this.setState({ query: value, suggestions: [] });
    this.props.updateEvents(lat, lon); //also call updateEvents() whenever handleItemClicked() is called and pass lat/lon
  }

  render() {
    return (
      <div className="CitySearch">
        <InfoAlert text={this.state.infoText} />
        <input type="text" className="city" value={this.state.query} onChange={this.handleInputChanged} placeholder="City" />

        <ul className="suggestions">
          {this.state.suggestions.map(item =>
            <li key={item.name_string} onClick={() => this.handleItemClicked(item.name_string, item.lat, item.lon)}>{item.name_string}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default CitySearch;