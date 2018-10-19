import React from 'react';

class Settings extends React.Component {
  state = {
    autoScratch: false
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.new_email.value);
  };

  validateForm() {
    if (!this.state['email'] || this.state['email'].length === 0) {
      console.error('Form not validated');
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newEmail">
          Update Email
          <input
            type="text"
            name="newEmail"
            placeholder="New email"
            onChange={e => this.handleChange(e)}
          />
        </label>

        <label htmlFor="password">
          Current Password
          <input
            type="text"
            name="password"
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

        <label htmlFor="autoScratch">
          Auto Scratch Mode
          <input
            type="checkbox"
            name="autoScratch"
            checked={this.state.autoScratch}
            onChange={e => this.handleChange(e)}
          />
        </label>

        <br />
        <input type="submit" placeholder="Submit" />
      </form>
    );
  }
}

export default Settings;
