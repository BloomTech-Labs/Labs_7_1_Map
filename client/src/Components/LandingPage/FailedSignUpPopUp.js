import React, { Component } from 'react';
import './FailedSignUpPopUp.css';

export default class FailedSignUpPopUp extends Component {
  render() {
    return <div className="FailedSignUpPopUp">{this.props.message}</div>;
  }
}
