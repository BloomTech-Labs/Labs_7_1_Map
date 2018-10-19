import React, { Component } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class ChangePassword extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState({
      [name]: value
    });
  };

  handleSubmitPassword = async e => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = this.state;

    // Error handling
    if (!currentPassword) return console.error('Enter your current password!');
    if (newPassword !== confirmNewPassword)
      return console.error('Passwords do not match!');
    if (newPassword.length < 6)
      return console.error('Password needs to be at least 6 characters!');

    const url = `${BACKEND_URL}/api/change_password`;
    const body = {
      // TODO: pull username from global state
      username: 'username',
      password: currentPassword,
      new_password: newPassword
    };
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }
    };

    console.log(url, body, options);
    // try {
    //   const updatedUser = await axios.post(url, body, options);
    //   console.log('Password updated successfully', updatedUser);
    // } catch (err) {
    //   console.error('Error changing your password', err);
    // }
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmitPassword}
        className="Settings__ChangePassword"
      >
        <label htmlFor="currentPassword">
          Current Password
          <input
            type="text"
            name="currentPassword"
            placeholder="Current password"
            onChange={e => this.handleChange(e)}
          />
        </label>

        <label htmlFor="newPassword">
          New Password
          <input
            type="text"
            name="newPassword"
            placeholder="New password"
            onChange={e => this.handleChange(e)}
          />
        </label>

        <label htmlFor="confirmNewPassword">
          Confirm New password
          <input
            type="text"
            name="confirmNewPassword"
            placeholder="Confirm new password"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <input type="submit" placeholder="Submit" />
      </form>
    );
  }
}

export default ChangePassword;
