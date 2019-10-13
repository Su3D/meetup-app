import { mockEvents } from './mock-events';

async function getSuggestions(query) {
  return [
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
  ];
}

async function getEvents(lat, lon) {
  return mockEvents.events;
}

export { getSuggestions, getEvents };