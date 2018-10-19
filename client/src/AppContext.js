import React, { Component } from 'react';

// new context
const AppContext = React.createContext();

// provider component
export class AppContextProvider extends Component {
  state = { authenticated: false };

  render() {
    return (
      <AppContext.Provider
        value={{
          AppState: this.state,
          authenticated: this.state.authenticated
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
