import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { AppContextConsumer } from '../../AppContext';
import './SignIn.css';

//const URL = process.env.REACT_APP_LOCAL_BACKEND_URL || 'http://127.0.0.1:8000/api';
const URL =
  process.env.REACT_APP_REMOTE_BACKEND_URL ||
  'https://scratch-n-map.herokuapp.com/api';

class SignIn extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  };

  handleSubmit = (e, login) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };
    login(user);
  };
  render() {
    return (
      <AppContextConsumer>
        {({ handleSignIn, AppState: { error } }) => (
          <div className="SignIn">
            <div className="SignIn__card">
              <form onSubmit={e => this.handleSubmit(e, handleSignIn)}>
                <input
                  onChange={this.handleChange}
                  value={this.state.username}
                  name="username"
                  type="text"
                  className="form__input"
                  placeholder="Username"
                />
                <input
                  onChange={this.handleChange}
                  value={this.state.password}
                  name="password"
                  type="password"
                  className="form__input"
                  placeholder="password"
                />

                <button className="form__button">Sign In</button>
                <span className="danger">{error ? error : ''}</span>
              </form>
            </div>
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

SignIn.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};

export default SignIn;
