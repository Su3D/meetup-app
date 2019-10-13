import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockEvents } from '../mock-events';

//scope for unit testing
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


//scope for integration testing
describe('<App /> integration', () => {

  //tests if list of events has been updated after user selects city
  test('get list of events after user selects a city', () => {
    const AppWrapper = mount(<App />); //sets AppWrapper to use full rendering API from Enzyme
    AppWrapper.instance().updateEvents = jest.fn(); //tells Jest to execute the function on the component so you can see the results
    AppWrapper.instance().forceUpdate(); //update the App component
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.instance().handleItemClicked('value', 1.1, 1.2);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1); //requires the updateEvents() function to have been called once (1)
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(1.1, 1.2); //requires the updateEvents() function to have been called with same lat/long specified above
    AppWrapper.unmount();
  });

  //tests that App component's 'events' state is equal to mocked event data after calling updateEvents() function
  test('change state after get list of events', async () => {
    const AppWrapper = shallow(<App />);
    AppWrapper.instance().updateEvents(1.1, 1.2);
    await AppWrapper.update();
    expect(AppWrapper.state('events')).toEqual(mockEvents.events);
  });

  //tests that events rendered in EventList are the events received from App component
  test('render correct list of events', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ events: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] });
    expect(AppWrapper.find('.Event')).toHaveLength(4);
    AppWrapper.unmount();
  });

});