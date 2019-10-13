import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {
  //sets AppWrapper to use the shallow rendering API from Enzyme
  //for all tests
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  //test that EventList exists in the App component
  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  //test that CitySearch exists in the App component
  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  //test that NumberOfEvents exists in the App component
  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });

});