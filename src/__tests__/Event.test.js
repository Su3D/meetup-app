import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';
import EventDetails from '../EventDetails';

describe('<Event /> component', () => {
  //sets EventWrapper to use the shallow rendering API from Enzyme
  //for all tests
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event />);
  });

  //test that eventDate exists in the Event component
  test('render event time and date', () => {
    expect(EventWrapper.find('.eventDate')).toHaveLength(1);
  });

  //test that eventName exists in the Event component
  test('render event name', () => {
    expect(EventWrapper.find('.eventName')).toHaveLength(1);
  });

  //test that groupName exists in the Event component
  test('render group name', () => {
    expect(EventWrapper.find('.groupName')).toHaveLength(1);
  });

  //test that yesRSVP exists in the Event component
  test('render people going', () => {
    expect(EventWrapper.find('.yesRSVP')).toHaveLength(1);
  });

  //test that details exists in the Event component
  test('render button that displays event details', () => {
    expect(EventWrapper.find('.details')).toHaveLength(1);
  });

  //test that EventDetails exists in the Event component
  test('render event details', () => {
    expect(EventWrapper.find(EventDetails)).toHaveLength(1);
  });

  //test that clicking details button shows event details
  test('click on details button should expand event details', () => {
    expect(EventWrapper.state('showDetails')).toEqual(false);
    EventWrapper.find('.details').simulate('click');
    expect(EventWrapper.find(EventDetails).prop('isOpen')).toEqual(true);
  });

  //tests that clicking details button again hides event details
  test('click on details button should collapse event details', () => {
    expect(EventWrapper.state('showDetails')).toEqual(true);
    EventWrapper.find('.details').simulate('click');
    expect(EventWrapper.find(EventDetails).prop('isOpen')).toEqual(false);
  });

});