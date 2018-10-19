import React, { Component } from 'react';
// import axios from 'axios';

import './ChangePassword.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class ChangePassword extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  toggleShow = () => {
    console.log('bang');
    this.setState({ show: !this.state.show });
    console.log(this.state);
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

  handleSubmit = async e => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = this.state;

    // Error handling
    if (!currentPassword) return console.error('Enter your current password!'); // eslint-disable-line
    if (newPassword !== confirmNewPassword)
      return console.error('Passwords do not match!'); // eslint-disable-line
    if (newPassword.length < 6)
      return console.error('Password needs to be at least 6 characters!'); // eslint-disable-line

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
    // TODO: Enable this once SignIn form is complete
    // try {
    //   const updatedUser = await axios.post(url, body, options);
    //   console.log('Password updated successfully', updatedUser);
    // } catch (err) {
    //   console.error('Error changing your password', err);
    // }
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
                type="text"
                name="currentPassword"
                placeholder="Current password"
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div className="ChangePassword__newPassword">
              <h5>New Password</h5>
              <input
                type="text"
                name="newPassword"
                placeholder="New password"
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div className="ChangePassword__confirmNewPassword">
              <h5>Confirm New password</h5>
              <input
                type="text"
                name="confirmNewPassword"
                placeholder="Confirm new password"
                onChange={e => this.handleChange(e)}
              />
            </div>
            <input
              type="submit"
              placeholder="Submit"
              className="ChangePassword__submit"
            />
          </form>
        )}
      </div>
    );
  }
}

export default ChangePassword;
