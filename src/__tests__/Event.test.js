import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';

describe('<Event /> render', () => {
  //sets EventWrapper to use the shallow rendering API from Enzyme
  //for all tests
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(
      <Event event={
        {
          local_date: '2019-10-22',
          local_time: '18:00',
          name: 'Monthly DenverScript Meetup',
          yes_rsvp_count: 40,
          link: 'https://www.meetup.com/DenverScript/events/xrfkbryznbmc/',
          description: '<p>6:15 pm: Intro and What\'s going on in JavaScript Land? (20min)</p> <p>We\'ll be talking about new/exciting things going on in the industry. If you have something you think we should mention, feel free to tweet us @DenverScript (twitter.com/denverscript).</p>',
          visibility: 'public',
          venue: {
            name: 'Code Talent',
            address_1: '3412 Blake St',
            city: 'Denver',
            localized_country_name: 'USA',
          },
          group: {
            name: 'DenverScript',
          },
        }
      } />
    );
  });

  //set the event details to be closed
  beforeEach(() => {
    EventWrapper.setState({ expanded: false });
  });

  //test for items with classes: .Event, .time, .name, .group-name, .going exist in Event component
  test('render enough information', () => {
    expect(EventWrapper.find('.Event')).toHaveLength(1);
    expect(EventWrapper.find('.time')).toHaveLength(1);
    expect(EventWrapper.find('.name')).toHaveLength(1);
    expect(EventWrapper.find('.group-name')).toHaveLength(1);
    expect(EventWrapper.find('.going')).toHaveLength(1);
  });

  //test that items match
  test('render correct information', () => {
    expect(EventWrapper.find('.time').text()).toEqual('18:00 - 2019-10-22');
    expect(EventWrapper.find('.name').text()).toEqual('Monthly DenverScript Meetup');
    expect(EventWrapper.find('.group-name').text()).toEqual('Group: DenverScript');
    expect(EventWrapper.find('.going').text()).toEqual('40 people are going');
  });

  //test that clicking details button shows event details
  test('show extra info when user clicks on "Details" button', () => {
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.extra')).toHaveLength(1);
  });

  //tests that clicking details button again hides event details
  test('hide extra info when user clicks on "Details" button', () => {
    EventWrapper.setState({ expanded: true });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.extra')).toHaveLength(0);
  });

  //test for items with classes: .extra AND .address, .visibility, .link, .description exist in Event component
  test('Display extra info', () => {
    EventWrapper.setState({ expanded: true });
    expect(EventWrapper.find('.extra .address')).toHaveLength(1);
    expect(EventWrapper.find('.extra .visibility')).toHaveLength(1);
    expect(EventWrapper.find('.extra .link')).toHaveLength(1);
    expect(EventWrapper.find('.extra .description')).toHaveLength(1);
  });

  //test that items match
  test('Display correct extra info', () => {
    EventWrapper.setState({ expanded: true });
    expect(EventWrapper.find('.extra .address').text()).toEqual('Code Talent, 3412 Blake St, Denver, USA');
    expect(EventWrapper.find('.extra .visibility').text()).toEqual('public');
    expect(EventWrapper.find('.extra .link').prop('href')).toEqual('https://www.meetup.com/DenverScript/events/xrfkbryznbmc/');
    expect(EventWrapper.find('.extra .description').html()).toEqual('<div class=\"description\"><p>6:15 pm: Intro and What\'s going on in JavaScript Land? (20min)</p> <p>We\'ll be talking about new/exciting things going on in the industry. If you have something you think we should mention, feel free to tweet us @DenverScript (twitter.com/denverscript).</p></div>');
  });
});