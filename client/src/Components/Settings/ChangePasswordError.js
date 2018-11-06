import React, { Component } from 'react'

export default class ChangePasswordError extends Component {
  render() {
    return (
      <div>
        {this.props.error}
      </div>
    )
  }
}
