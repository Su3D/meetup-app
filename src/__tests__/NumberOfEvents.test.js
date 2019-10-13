import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  //sets NumberOfEventsWrapper to use the shallow rendering API from Enzyme
  //for all tests
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
  });

  //tests that an input with class .number-of-events exists in the NumberOfEvents component
  test('render event number input', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  /*/test that when no number has been entered the default is 32
  test('default event number is 32', () => {
    expect(NumberOfEventsWrapper.state('eventNumber')).toBe(32);
  });*/

  //
  test('render number input correctly', () => {
    const number = NumberOfEventsWrapper.state('number');
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(number);
  });

  //test that the state is changed when the user enters text in the input field 
  test('change state when number input changes', () => {
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', { target: { value: 20 } });
    expect(NumberOfEventsWrapper.state('number')).toBe(20);
  });
});