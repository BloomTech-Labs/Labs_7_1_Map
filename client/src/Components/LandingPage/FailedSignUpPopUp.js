import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FailedSignUpPopUp.css';

export default class FailedSignUpPopUp extends Component {
  render() {
    if (this.props.message) {
    return <div className="FailedSignUpPopUp">{this.props.message}</div>;
    } else {
      return <div className="Fill">empty space</div>
    }
  }
}

FailedSignUpPopUp.propTypes = {
  message: PropTypes.string
};