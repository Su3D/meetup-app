import React from 'react';
import { shallow } from 'enzyme';

import CitySearch from '../CitySearch';

//scope for unit testing
describe('<CitySearch /> component', () => {
  //sets CitySearchWrapper to use the shallow rendering API from Enzyme
  //for all tests
  let CitySearchWrapper;
  beforeAll(() => {
    //CitySearchWrapper = shallow(<CitySearch />);
    CitySearchWrapper = shallow(<CitySearch updateEvents={() => { }} />);
  });

  //tests that an element with the class .city exists in the CitySearch component
  test('render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  //test that an element with the class name .suggestions exixts in the CitySearch component
  test('render list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  //compares search query with name of each city suggestion in list of cities
  //only passes if they match
  test('render text input correctly', () => {
    const query = CitySearchWrapper.state('query'); //sets to query user types into textbox
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  //test that the state is changed when the user enters text in the input field 
  test('change state when text input changes', () => {
    const eventObject = { target: { value: 'Denver' } }; //change value to Denver when change event is called
    CitySearchWrapper.find('.city').simulate('change', eventObject); //simulates change on city - changing it to the target value: 'Denver'
    expect(CitySearchWrapper.state('query')).toBe('Denver');
  });

  //verify list of suggestions rendered matches list of suggestions in component state 
  test('render list of suggestions correctly', () => {
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i].name_string);
    }
  });

  //test if value of query’s state changes when the user clicks on a suggested city AND clear the list of suggestions
  test('click on suggestion should change query state and empty the list of suggestions', () => {
    CitySearchWrapper.setState({
      suggestions: [
        {
          city: 'Arvada',
          country: 'us',
          localized_country_name: 'USA',
          state: 'CO',
          name_string: 'Arvada, Colorado, USA',
          zip: '80001',
          lat: 39.8,
          lon: -105.09
        },
        {
          city: 'Arvada',
          country: 'us',
          localized_country_name: 'USA',
          state: 'WY',
          name_string: 'Arvada, Wyoming, USA',
          zip: '82831',
          lat: 44.71,
          lon: -106.1
        }
      ]
    });
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe('Arvada, Colorado, USA');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(0);
  });
});


//scope for integration testing
describe('<CitySearch /> integration', () => {
  //test whether the value of suggestions on the state of CitySearch is equal to given object(s)
  test('get a list of cities when user searches for Arvada', async () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Arvada' } });
    await CitySearchWrapper.update();
    expect(CitySearchWrapper.state('suggestions')).toEqual([
      {
        city: 'Arvada',
        country: 'us',
        localized_country_name: 'USA',
        state: 'CO',
        name_string: 'Arvada, Colorado, USA',
        zip: '80001',
        lat: 39.8,
        lon: -105.09
      },
      {
        city: 'Arvada',
        country: 'us',
        localized_country_name: 'USA',
        state: 'WY',
        name_string: 'Arvada, Wyoming, USA',
        zip: '82831',
        lat: 44.71,
        lon: -106.1
      }
    ]);
  });

});