import React, { Component } from 'react';
import axios from 'axios';
import { clearLocalstorage } from './utils.js';

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
      info: {}
    },
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
        console.log(response);

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

  hasGeolocation = () => {
    // Browsers built-in method to get a user's location
    navigator.geolocation.getCurrentPosition(position => {
      this.updateUserPosition(
        position.coords.latitude,
        position.coords.longitude
      );
    });
  };

  // Update the user's geolocation position
  updateUserPosition = (lat, lng) => {
    this.setState({
      userPosition: { lng, lat }
    });
  };
  updateCountryPanel() {
    console.log('HELLO WOrld', this.state.currentCountry);
  }

  // Update state with currently selected country, called in Map.js
  handleUpdateCurrentCountry = (code, info) => {
    this.setState({
      currentCountry: { code, info },
      countryPanelIsOpen: true
    });

    // update the panel with current country
    this.updateCountryPanel();
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
  };

  handleSignOut = () => {
    this.setState({ authenticated: false, user: {} });
    clearLocalstorage();
  };

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
  };

  toggleCountryPanel = () => {
    this.setState({ countryPanelIsOpen: !this.state.countryPanelIsOpen });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          AppState: this.state,
          updateUserPosition: this.handleUpdateUserPosition,
          updateCurrentCountry: this.handleUpdateCurrentCountry,
          authenticated: this.state.authenticated,
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut,
          handleSignUp: this.handleSignUp,
          toggleCountryPanel: this.toggleCountryPanel
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
