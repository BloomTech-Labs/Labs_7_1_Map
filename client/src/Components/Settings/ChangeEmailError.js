import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChangeEmailError extends Component {
  render() {
    return <div>{this.props.error}</div>;
  }
}

ChangeEmailError.propTypes = {
  error: PropTypes.string
};
