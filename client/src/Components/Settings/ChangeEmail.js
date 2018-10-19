import React, { Component } from 'react';

class ChangeEmail extends Component {
  state = {
    currentPassword: '',
    newEmail: ''
  };

  handleSubmit= async e => {
    e.preventDefault();
    // TODO: Make axios call to backend
    console.log(this.state);
  };

  handleChange = event => {
    const { name, value } = event.target
    console.log(name, value);

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="Settings__ChangeEmail"
      >

        <label htmlFor="newEmail">
          New Email
          <input
            type="text"
            name="newEmail"
            placeholder="New Email"
            onChange={e => this.handleChange(e)}
          />
        </label>

        <label htmlFor="currentPassword">
          Current Password
          <input
            type="text"
            name="currentPassword"
            placeholder="Current Password"
            onChange={e => this.handleChange(e)}
          />
        </label>

        <input type="submit" placeholder="Submit" />

      </form>
    );
  }
}

export default ChangeEmail;
