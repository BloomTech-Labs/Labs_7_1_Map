import React, { Component } from 'react';
import axios from 'axios';
import { clearLocalstorage, getCountryShapeFromCode } from './utils.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// new context
const AppContext = React.createContext();

// provider component
export class AppContextProvider extends Component {
  state = {
    authenticated: false,
    user: {},
    userPosition: {
      lat: 22.28552,
      lng: 114.15769
    },
    currentCountry: {
      code: '',
      info: {},
      geoInfo: {}
    },
    currentCountryStatus: null,
    countryPanelIsOpen: false
  };

  async componentDidMount() {
    // Check if a user is already logged in
    try {
      // Retrieve token and user stored in local storage
      const token = localStorage.getItem('token');
      const user = await JSON.parse(localStorage.getItem('user'));

      if (token && user) {
        const requestOptions = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Get the user info from DB
        const response = await axios.get(
          `${BACKEND_URL}/get_user/${user.id}`,
          requestOptions
        );

        if (response.status === 200) {
          this.setState({
            authenticated: true,
            user: { ...response.data }
          });
        } else {
          clearLocalstorage(); // response was not 200
        }
      } else {
        clearLocalstorage(); // token or user not in localstorage
      }
    } catch (e) {
      // failed async
      clearLocalstorage(); // error encountered
    }

    // Ask for user location if browser is compatible
    if ('geolocation' in navigator) this.hasGeolocation();
  } // componentDidMount

  // get the status code of a country saved on user if it exists
  // otherwise, return 0
  getCurrentCountryStatus = () => {
    const currentCountryCode = this.state.currentCountry.code;
    const userCountries = this.state.user.countries;

    if (userCountries) {
      const findCountry = userCountries.find(
        country => currentCountryCode === country.country_code
      );

      return findCountry ? findCountry.status_code : 0;
    }
  }; // getCurrentCountryStatus

  hasGeolocation = () => {
    // Browsers built-in method to get a user's location
    navigator.geolocation.getCurrentPosition(position => {
      this.updateUserPosition(
        position.coords.latitude,
        position.coords.longitude
      );
    });
  }; // hasGeolocation

  // Update the user's geolocation position
  updateUserPosition = (lat, lng) => {
    this.setState({
      userPosition: { lng, lat }
    });
  };

  handleUpdatePreferences = async preferences => {
    // TODO: Abort if preferences does not have valid values
    try {
      const body = {
        username: this.state.user.username,
        preferences
      };

      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };

      const request = await axios.put(
        `${BACKEND_URL}/update_preferences`,
        body,
        options
      );
      if (request.status === 200)
        console.log(
          'Preferences were updated successfully!',
          request.status,
          request.body
        );

      if (request.status === 400)
        console.log(
          'Preferences failed to update!',
          request.status,
          request.body
        );
    } catch (err) {
      console.error('There was an error trying to update preferences!');
    }
  }; // update_preferences

  // Update state with currently selected country, called in Map.js
  handleUpdateCurrentCountry = (code, info) => {
    const geoInfo = getCountryShapeFromCode(code);
    this.setState({
      currentCountry: { code, info, geoInfo },
      countryPanelIsOpen: true
    });
    this.setState({
      currentCountryStatus: this.getCurrentCountryStatus()
    });
  };

  // Called in BorderBay.js
  handleSliderMove = async value => {
    try {
      const { user, currentCountry } = this.state;
      const body = {
        username: user.username,
        country_code: currentCountry.code,
        name: currentCountry.info.name,
        status_code: value
      };

      const response = await axios.post(`${BACKEND_URL}/country_status`, body);

      // Clear user on state first as a workaround for the following issue:
      //    Updating an existing country would not update the color
      //    Clearing the user on state first forces the geojson layer to re-render
      // This is because React is not detecting changes in nested objects.
      // TODO: Store users' countries as an array on AppState (not inside user)
      this.setState({ user: {} });
      this.setState({ user: response.data });
      this.setState({ currentCountryStatus: this.getCurrentCountryStatus() });
    } catch (err) {
      console.error('Error update country status!');
    }
  };

  handleSignIn = async e => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, body);
      const user = await JSON.stringify(response.data.user);
      localStorage.setItem('token', response.data.jwt_token);
      localStorage.setItem('user', user);
      this.setState({ authenticated: true, user: { ...response.data.user } });
    } catch (e) {
      // failed async
    }
  }; // handleSignIn

  handleSignOut = () => {
    this.setState({ authenticated: false, user: {} });
    clearLocalstorage();
  }; // handleSignOut

  handleSignUp = async e => {
    e.preventDefault();

    // TODO: Error handling
    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value
    };

    const response = await axios.post(`${BACKEND_URL}/register`, body);
    const user = JSON.stringify(response.data.user);
    localStorage.setItem('token', response.data.jwt_token);
    localStorage.setItem('user', user);
    this.setState({ authenticated: true, user: response.data.user });
  }; // handleSignUp

  toggleCountryPanel = () => {
    this.setState({ countryPanelIsOpen: !this.state.countryPanelIsOpen });
  }; // toggleCountryPanel

  render() {
    return (
      <AppContext.Provider
        value={{
          AppState: this.state,
          authenticated: this.state.authenticated,
          currentCountryInfo: this.state.currentCountry.geoInfo,
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut,
          handleSignUp: this.handleSignUp,
          handleSliderMove: this.handleSliderMove,
          handleUpdatePreferences: this.handleUpdatePreferences,
          toggleCountryPanel: this.toggleCountryPanel,
          updateCurrentCountry: this.handleUpdateCurrentCountry,
          updateUserPosition: this.handleUpdateUserPosition
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
