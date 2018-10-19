import React, { Component } from 'react';
import axios from 'axios';

//const URL = process.env.REACT_APP_LOCAL_BACKEND_URL || 'http://127.0.0.1:8000/api';
const URL =
  process.env.REACT_APP_REMOTE_BACKEND_URL ||
  'https://scratch-n-map.herokuapp.com/api';

// initialize the React Context API
const AppContext = React.createContext();

export class AppContextProvider extends Component {
  state = {
    authenticated: false,
    error: ''
  };
  login = user => {
    (async () => {
      try {
        const response = await axios.post(`${URL}/login`, user);

        const data = response.data;

        if (data.jwt_token) {
          // set the token to local storage
          localStorage.setItem('jwt_token', data.jwt_token);

          // reset the fields
          this.setState({
            error: ''
          });
        } else {
          this.setState({ error: 'Unexpected error!' });
          return; // terminate the process
        }
      } catch (err) {
        if (process.env.REACT_APP_DEV) {
          console.log(err);
        }
        this.setState({ error: 'Unexpected error!' });
        return; // terminate the process
      }
    })(); // self executing function
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          AppState: this.state,
          authenticated: this.state.authenticated,
          handleSignIn: this.login
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
