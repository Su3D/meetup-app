import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  //sets NumberOfEventsWrapper to use the shallow rendering API from Enzyme
  //for all tests
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  //tests that an input exists in the NumberOfEvents component
  test('render event number input', () => {
    expect(NumberOfEventsWrapper.find('input')).toHaveLength(1);
  });

  //test that when no number has been entered the default is 32
  test('default event number is 32', () => {
    expect(NumberOfEventsWrapper.state('eventNumber')).toBe(32);
  });

  //test that the state is changed when the user enters text in the input field 
  test('change state when number input changes', () => {
    const eventObject = { target: { value: 25 } };
    NumberOfEventsWrapper.find('input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventNumber')).toBe(25);
  });
});