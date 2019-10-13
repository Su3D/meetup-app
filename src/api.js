import axios from 'axios';

import { mockEvents } from './mock-events';


//get OR renew access_token
async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === 'get') {
    // Lambda endpoint to get token by code
    url = 'https://x378hskxk6.execute-api.us-east-1.amazonaws.com/dev/api/token/'
      + key;
  } else if (type === 'renew') {
    // Lambda endpoint to get token by refresh_token
    url = 'https://x378hskxk6.execute-api.us-east-1.amazonaws.com/dev/api/refresh/'
      + key;
  }
  // Use Axios to make a GET request to the endpoint
  const tokenInfo = await axios.get(url);
  // Save tokens to localStorage together with a timestamp
  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());
  // Return the access_token
  return tokenInfo.data.access_token;
}


async function getAccessToken() {
  //check users local storage for access_token
  const accessToken = localStorage.getItem('access_token');

  //IF no access_token is found check for code, if no code is found get it from Meetup
  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (!code) {
      window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=bqk31njs5dm7oekb196m6l7c44&response_type=code&redirect_uri=https://su3d.github.io/meetup-app/';
      return null;
    }
    return getOrRenewAccessToken('get', code);
  }

  //IF access_token is found in local storage is it still valid?
  const lastSavedTime = localStorage.getItem('last_saved_time');
  if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
    return accessToken;
  }

  //IF access_token is expired renew it via refresh_token
  const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);
}




//check where the app is hosted to see what location data to return
async function getSuggestions(query) {
  //IF app is on localhost return the mock data
  if (window.location.href.startsWith('http://localhost')) {
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

  //IF not on localhost ask for access_token and send GET request to real Meetup API
  const token = await getAccessToken();
  if (token) {
    //endpoint for Meetup API "Find Locations" method
    const url = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query='
      + query
      + '&access_token=' + token;
    const result = await axios.get(url);
    return result.data;
  }
  return []; //return empty array IF access_token  is found
}


//check where the app is hosted to see what event data to return
async function getEvents(lat, lon, page) {
  //IF app is on localhost return the mock data
  if (window.location.href.startsWith('http://localhost')) {
    return mockEvents.events;
  }

  //IF not on localhost ask for access_token and send GET request to real Meetup API
  const token = await getAccessToken();
  if (token) {
    //endpoint for Meetup API "Upcoming Events" method
    let url = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public'
      + '&access_token=' + token;
    // lat, lon is optional; if you have a lat and lon, you can add them
    if (lat && lon) {
      url += '&lat=' + lat + '&lon=' + lon;
    }
    //default number of events has benn changed
    if (page) {
      url += '&page=' + page;
    }
    const result = await axios.get(url);
    return result.data.events;
  }
  return []; //return empty array IF access_token  is found
}

export { getSuggestions, getEvents };