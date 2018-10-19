import React, { Component } from 'react';
// import axios from 'axios';

import './ChangeEmail.css';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class ChangeEmail extends Component {
  state = {
    show: false,
    currentPassword: '',
    newEmail: ''
  };

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // TODO: Make axios call to backend
    console.log(this.state);
  };

  handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value);

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
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div className="ChangeEmail__currentPassword">
              <h5>Current Password</h5>
              <input
                type="text"
                name="currentPassword"
                placeholder="Current Password"
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
}

export default ChangeEmail;
