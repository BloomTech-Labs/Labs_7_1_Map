import React, { Component } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AppContext = React.createContext();

export class AppContextProvider extends Component {
  state = {
    test: 'Hello!',
    authenticated: false,
    user: {}
  };

  handleSignIn = async e => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    const response = await axios.post(`${BACKEND_URL}/login`, body);
    await localStorage.setItem('token', response.data.jwt_token);
    // await this.props.updateUserData(response.data.user);
    this.setState({ authenticated: true, user: response.data.user });
  };

  handleSignOut = () => {
    this.setState({ authenticated: false, user: {} });
    localStorage.removeItem('token');
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          AppState: this.state,
          authenticated: this.state.authenticated,
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
