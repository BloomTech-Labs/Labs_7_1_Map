import React, { Component } from 'react';
import './Note.css';

export default class componentName extends Component {
  render() {
    const { username } = this.props.user;
    return (
      <div className="View-Note" onClick={this.props.editviewToggle}>
        <p>{'Note by: ' + username}</p>
        <p>{this.props.editnote}</p>
        <p> {'click to edit'} </p>
      </div>
    );
  }
}
//user editnote editviewToggle
