import React, { Component } from 'react';

export default class FailedSignUpPopUp extends Component {
  render() {
    return <div>Sorry! {this.props.message}</div>;
  }
}
