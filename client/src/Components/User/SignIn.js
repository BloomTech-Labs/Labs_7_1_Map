import React, { Component } from 'react';
import axios from 'axios';
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
    password: '',
    error: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    (async () => {
      try {
        const response = await axios.post(`${URL}/login`, user);

        const data = response.data;

        if (data.jwt_token) {
          // set the token to local storage
          localStorage.setItem('jwt_token', data.jwt_token);

          // reset the fields
          this.setState({
            username: '',
            password: '',
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
      <AppContextConsumer>
        {props => (
          <div className="SignIn">
            <div className="SignIn__card">
              <form onSubmit={this.handleSubmit}>
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

                <button className="form__button">Sign In Test</button>
                <span className="danger">
                  {this.state.error ? this.state.error : ''}
                </span>
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
