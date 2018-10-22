import React, { Component } from 'react';

const AppContext = React.createContext();

export class AppContextProvider extends Component {
  state = {
    test: 'Hello!',
    authenticated: false,
    user: {}
  };

  updateUserData = user => {
    this.setState({ authenticated: true, user });
  };

  clearUserData = () => {
    this.setState({ authenticated: false, user: {} });
    localStorage.removeItem('token');
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          AppState: this.state,
          authenticated: this.state.authenticated,
          updateUserData: this.updateUserData,
          clearUserData: this.clearUserData
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
