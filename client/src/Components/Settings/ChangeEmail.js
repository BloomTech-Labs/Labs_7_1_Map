import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ChangeEmailError from './ChangeEmailError';
import './ChangeEmail.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class ChangeEmail extends Component {
  state = {
    currentPassword: '',
    newEmail: '',
    emailError: ''
  };

  // handleSubmit for ChangeEmail
  handleSubmit = async e => {
    e.preventDefault();
    const { newEmail } = this.state;

    if (!newEmail) {
      return this.setState({
        emailError: 'Please complete the form'
      });
    }

    try {
      const token = localStorage.getItem('token');

      const body = {
        new_email: newEmail
      };

      const options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.put(
        `${BACKEND_URL}/change_email`,
        body,
        options
      );
      // TODO: Notify user of success or failure
      console.log('Email updated sucessfully!', response.data);
      this.setState({ currentPassword: '', newEmail: '', show: false });
    } catch (err) {
      console.error('Error updating email!', err);
    }
  }; // handleSubmit

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="ChangeEmail">
        <h1 onClick={() => this.props.handleChangeEmailClick()}>
          Change Email...
        </h1>
        {this.props.showingChangeEmail && (
          <form onSubmit={this.handleSubmit} className="Settings__ChangeEmail">
            <div className="ChangeEmail__NewEmail">
              <h5 id="NewEmail__header">New Email</h5>
              <input
                type="text"
                name="newEmail"
                value={this.state.newEmail}
                onChange={e => this.handleChange(e)}
                className="ChangeEmail__input"
              />
            </div>

            <input
              className="ChangeEmail__submit"
              type="submit"
              placeholder="Submit"
            />
            <ChangeEmailError error={this.state.emailError} />
          </form>
        )}
      </div>
    );
  }
} // ChangeEmail component

ChangeEmail.propTypes = {
  user: PropTypes.object,
  handleChangeEmailClick: PropTypes.func,
  showingChangeEmail: PropTypes.bool
};

export default ChangeEmail;
