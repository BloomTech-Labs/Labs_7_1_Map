import React, { Component } from 'react';

const AppContext = React.createContext();

export class AppContextProvider extends Component {
  state = {
    test: 'Hello!',
    authenticated: false,
    user: {}
  };

  updateUserData = () => {
    this.setState({ authenticated: true });
  };

  clearUserData = () => {
    this.setState({ authenticated: false, user: {} });
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
