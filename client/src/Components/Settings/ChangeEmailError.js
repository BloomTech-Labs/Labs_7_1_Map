import React, { Component } from 'react';

export default class ChangeEmailError extends Component {
  render() {
    return <div>{this.props.error}</div>;
  }
}
