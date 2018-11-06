import React, { Component } from 'react';
import axios from 'axios';

import './ChangeEmail.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class ChangeEmail extends Component {
  state = {
    show: false,
    currentPassword: '',
    newEmail: '',
    emailError: '',
    emailValid: false,
    passwordValid: false,
  };

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  handleErrorChecking = () => {
    if (this.)
  }

  // handleSubmit for ChangeEmail
  handleSubmit = async e => {
    e.preventDefault();
    // TODO: Error handling
    const { currentPassword, newEmail } = this.state;

    try {
      const token = localStorage.getItem('token');

      const body = {
        username: this.props.user.username,
        password: currentPassword,
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
        <h4 onClick={() => this.toggleShow()}>Change Email...</h4>
        {this.state.show && (
          <form onSubmit={this.handleSubmit} className="Settings__ChangeEmail">
            <div className="ChangeEmail__newEmail">
              <h5>New Email</h5>
              <input
                type="text"
                name="newEmail"
                placeholder="New Email"
                value={this.state.newEmail}
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div className="ChangeEmail__currentPassword">
              <h5>Current Password</h5>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={this.state.currentPassword}
                onChange={e => this.handleChange(e)}
              />
            </div>

            <input
              className="ChangeEmail__submit"
              type="submit"
              placeholder="Submit"
            />
          </form>
        )}
      </div>
    );
  }
} // ChangeEmail component

export default ChangeEmail;
