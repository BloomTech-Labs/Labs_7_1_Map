import React, { Component } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// new context
const AppContext = React.createContext();
const clearLocalstorage = () => {
  // delete the tokens from the browser
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// provider component
export class AppContextProvider extends Component {
  state = {
    test: 'Hello!',
    authenticated: false,
    user: {},
    userPosition: {
      longitude: '',
      latitude: ''
    },
    currentCountry: {
      code: '',
      name: ''
    },
    friends: [
      { name: 'nalee' },
      { name: 'jon' },
      { name: 'thrun' },
      { name: 'sdf' },
      { name: 'sdfasf' },
      { name: 'werwer' },
      { name: 'wootie' }
    ]
  };
  async componentDidMount() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      const requestOptions = { headers: { Authorization: `Bearer ${token}` } };

      // get the user
      const response = await axios.get(
        `${BACKEND_URL}/get_user/${user.id}`,
        requestOptions
      );

      if (response.status === 200) {
        this.setState({
          authenticated: true,
          user: response.data.user
        });
      } else {
        clearLocalstorage();
      }
    } else {
      clearLocalstorage();
    }
  }

  //to update state: userPosition, used in Map.js
  handleUpdateUserPosition = (long, lat) => {
    this.setState({
      userPosition: {
        longitude: long,
        latitude: lat
      }
    });
  };

  //to update state: currentCountry (last clicked), called in Map.js
  handleUpdateCurrentCountry = (name, code) => {
    this.setState({
      currentCountry: {
        name: name,
        code: code
      }
    });
  };

  handleSignIn = async e => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    const response = await axios.post(`${BACKEND_URL}/login`, body);
    const user = JSON.stringify(response.data.user);

    localStorage.setItem('token', response.data.jwt_token);
    localStorage.setItem('user', user);
    this.setState({ authenticated: true, user: response.data.user });
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
          handleSignUp: this.handleSignUp
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
