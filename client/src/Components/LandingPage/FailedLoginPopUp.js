import React, { Component } from 'react';
import './FailedLoginPopUp.css';

export default class FailedLoginPopUp extends Component {
  render() {
    return (
      <div className="FailedLoginPopUp">
        <div className="FailedLoginPopUp__container">
          Failed to login, please check your login credentials.
        </div>
      </div>
    );
  }
}
