import React, { Component } from 'react';

export default class componentName extends Component {
  render() {
    const { username } = this.props.user;
    return (
      <div>
        <div className="View_Note">
          <p>{username + 's note:'}</p>
          <p>{this.props.editnote}</p>
          <button type="button" onClick={this.props.editviewToggle}>
            Edit
          </button>
        </div>
      </div>
    );
  }
}
//user editnote editviewToggle