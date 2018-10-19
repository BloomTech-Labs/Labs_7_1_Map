import React from 'react';
import axios from 'axios';

import ChangeEmail from './ChangeEmail';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class Settings extends React.Component {
  state = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    autoScratch: false
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
    console.log(this.state);

    const { currentPassword, newPassword, confirmNewPassword } = this.state;

    // Error handling
    if (!currentPassword) return console.error('Enter your current password!');
    if (newPassword !== confirmNewPassword)
      return console.error('Passwords do not match!');
    if (newPassword.length < 6)
      return console.error('Password needs to be at least 6 characters!');

    const url = `${BACKEND_URL}/api/change_password`;
    // TODO: pull username from global state and send in body
    const body = { password: currentPassword, new_password: newPassword };
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }
    };

    try {
      const updatedUser = await axios.post(url, body, options);
      console.log('Password updated successfully', updatedUser);
    } catch (err) {
      console.error('Error changing your password', err);
    }
  };

  validateForm() {
    if (!this.state['email'] || this.state['email'].length === 0) {
      console.error('Form not validated');
    }
  }

  render() {
    return (
      <div className="Settings">
        <ChangeEmail />
        {/*Change password form*/}
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

        {/*Preferences*/}
        <div>
          <label>
            Theme
            <select className="theme" name="Theme">
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </label>

          <label htmlFor="autoScratch">
            Auto Scratch Mode
            <input
              type="checkbox"
              name="autoScratch"
              checked={this.state.autoScratch}
              onChange={e => this.handleChange(e)}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Settings;
