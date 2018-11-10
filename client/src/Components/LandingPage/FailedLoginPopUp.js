import React, { Component } from 'react';
import './FailedLoginPopUp.css';

export default class FailedLoginPopUp extends Component {
  render() {
    return (
      <div className="FailedLoginPopUp">
        <div className="FailedLoginPopUp__container">
          Incorrect Credentials
        </div>
        <div className="arrowleft"/>
      </div>
    );
  }
}
