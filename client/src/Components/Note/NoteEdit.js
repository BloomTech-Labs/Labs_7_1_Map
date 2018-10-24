import React, { Component } from 'react';

export default class NoteEdit extends Component {
  render() {
    const { username } = this.props.user;
    //pass in this.props. submitchecker and user, onchangenote, messageboxcolor, messagebox
    return (
      <div className="Edit-Note">
        <form onSubmit={this.props.submitChecker}>
          <textarea
            input="text"
            className="Note_Create"
            rows="5"
            placeholder={
              username + ', what are your thoughts about this place?'
            }
            maxLength="250"
            onChange={this.props.onChangeNote}
            value={this.props.editnote}
          />
          <button type="submit">Submit</button>
        </form>
        <div
          className="messagebox"
          style={{ color: this.props.messageboxcolor }}
        >
          {this.props.messagebox}
        </div>
      </div>
    );
  }
}
