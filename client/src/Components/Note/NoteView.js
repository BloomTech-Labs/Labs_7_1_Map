import React, { Component } from 'react';
import './Note.css';

export default class componentName extends Component {
  render() {
    const { username } = this.props.user;
    return (
      <div className="View-Note">
        <p>{username + 's note:'}</p>
        <p>{this.props.editnote}</p>
        <button type="button" onClick={this.props.editviewToggle}>
          Edit
        </button>
      </div>
    );
  }
}
//user editnote editviewToggle
