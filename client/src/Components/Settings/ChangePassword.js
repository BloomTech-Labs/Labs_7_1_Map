import React, { Component } from 'react';
import axios from 'axios';

import ChangePasswordError from './ChangePasswordError';
import './ChangePassword.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class ChangePassword extends Component {
  state = {
    show: false,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    changePasswordError: ''
  };

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = this.state;

    if (!currentPassword || !newPassword, !confirmNewPassword) {
      return this.setState({
        changePasswordError: 'Please complete the form'
      });
    };
    if (newPassword !== confirmNewPassword) {
      return this.setState({
        changePasswordError: 'Passwords do not match'
      });
    };
    if (newPassword.length <6) {
      return this.setState({
        changePasswordError: 'Password must be at least 6 characters long'
      });
    };

    // Error handling
    // TODO: Notify user of errors
    if (!currentPassword) return console.error('Enter your current password!'); // eslint-disable-line
    if (newPassword !== confirmNewPassword)
      return console.error('Passwords do not match!'); // eslint-disable-line
    if (newPassword.length < 6)
      return console.error('Password needs to be at least 6 characters!'); // eslint-disable-line

    try {
      const url = `${BACKEND_URL}/change_password`;
      const body = {
        username: this.props.user.username,
        password: currentPassword,
        new_password: newPassword
      };
      const token = localStorage.getItem('token');
      const options = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.put(url, body, options);
      this.setState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        show: false
      });
      console.log('Password updated successfully', response.data);
    } catch (err) {
      // TODO: Notify user of errors
      console.error('Error changing your password', err);
    }
  };

  render() {
    return (
      <div className="ChangePassword">
        <h4 onClick={() => this.toggleShow()}>Change Password...</h4>
        {this.state.show && (
          <form
            onSubmit={this.handleSubmit}
            className="Settings__ChangePassword"
          >
            <div className="ChangePassword__currentPassword">
              <div>Current Password</div>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current password"
                value={this.state.currentPassword}
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div className="ChangePassword__newPassword">
              <h5>New Password</h5>
              <input
                type="password"
                name="newPassword"
                placeholder="New password"
                value={this.state.newPassword}
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div className="ChangePassword__confirmNewPassword">
              <h5>Confirm New password</h5>
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm new password"
                value={this.state.confirmNewPassword}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <input
              type="submit"
              placeholder="Submit"
              className="ChangePassword__submit"
            />
            <ChangePasswordError error={this.state.changePasswordError} />
          </form>
        )}
      </div>
    );
  }
}

export default ChangePassword;
