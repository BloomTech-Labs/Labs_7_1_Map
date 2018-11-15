import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FailedSignUpPopUp.css';

export default class FailedSignUpPopUp extends Component {
  render() {
    return <div className="FailedSignUpPopUp">{this.props.message}</div>;
  }
}

FailedSignUpPopUp.propTypes = {
  message: PropTypes.string
};
