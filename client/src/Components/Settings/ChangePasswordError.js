import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class ChangePasswordError extends Component {
  render() {
    return (
      <div>
        {this.props.error}
      </div>
    )
  }
}

ChangePasswordError.propTypes = {
  error: PropTypes.string
};
