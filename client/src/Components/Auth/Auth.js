import React, { Component } from 'react';
import axios from 'axios';

// will allow our component to access the global state of the app
import { AppContextConsumer } from '../../AppContext';

//const URL = process.env.REACT_APP_LOCAL_BACKEND_URL || 'http://127.0.0.1:8000/api';
const URL =
  process.env.REACT_APP_REMOTE_BACKEND_URL ||
  'https://scratch-n-map.herokuapp.com/api';

const Auth = Comp =>
  class extends Component {
    componentDidMount() {
      const token = localStorage.getItem('jwt_token');
      // TODO: Implementation of a verify token, how and when??
      // For now, having a token is enough
    }
    render() {
      return (
        <AppContextConsumer>
          {props => <Comp {...this.props} {...props} />}
        </AppContextConsumer>
      );
    }
  };

export default Auth;
