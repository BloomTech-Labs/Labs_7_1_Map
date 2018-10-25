import React, { Component } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// new context
const AppContext = React.createContext();

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
    friends: [
      { name: 'nalee' },
      { name: 'jon' },
      { name: 'thrun' },
      { name: 'sdf' },
      { name: 'sdfasf' },
      { name: 'werwer' },
      { name: 'werwer' }
    ]
  };

  //add long lat below
  handleUpdateUserPosition = (long, lat) => {
    this.setState({
      userPosition: {
        longitude: long, latitude: lat
      }
    });
    console.log('setting state', this.state.userPosition)
  }

  handleSignIn = async e => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    const response = await axios.post(`${BACKEND_URL}/login`, body);
    localStorage.setItem('token', response.data.jwt_token);
    this.setState({ authenticated: true, user: response.data.user });
  };

  handleSignOut = () => {
    this.setState({ authenticated: false, user: {} });
    localStorage.removeItem('token');
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
    localStorage.setItem('token', response.data.jwt_token);
    this.setState({ authenticated: true, user: response.data.user });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          AppState: this.state,
          updateUserPosition: this.handleUpdateUserPosition,

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
