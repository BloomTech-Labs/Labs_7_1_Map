import React, { Component } from 'react';
// import axios from 'axios';

import './Note.css';

class Note extends Component {
  state = {
    editnote: '',
    viewnote: '',
    messagebox: '',
    messageboxcolor: '',
    editview: 'false'
  };

  //this happens when something changes on the form
  onChangeNote = event => {
    this.setState({ editnote: event.target.value });
  };

  //when submit button is clicked
  submitChecker = event => {
    event.preventDefault();
    if (this.state.editnote !== '') {
      this.onSubmitSuccess(event);
    } else {
      this.onSubmitFailure();
    }
  };

  messageResetTimer = () => {
    setTimeout(() => {
      this.setState({ messagebox: '' });
    }, 3500);
  };

  //when submit checker says no
  onSubmitFailure = () => {
    this.setState({ messageboxcolor: 'red' });
    this.setState({
      messagebox: 'Please fill out your note before submitting!'
    });
    this.messageResetTimer();
  };

  //when submit checker says yes
  onSubmitSuccess = () => {
    const noteSubmission = {
      text: this.state.editnote
    };
    //put axios here
    console.log(noteSubmission);
    this.setState({
      editview: 'false'
    });
  };

  editviewToggle = () => {
    this.setState({editview: 'true' });
  };

  render() {
    if (this.state.editview === 'true') {
      return (
        <div className="Edit_Note">
          <form onSubmit={this.submitChecker}>
            <textarea
              input="text"
              className="Note_Create"
              rows="5"
              placeholder="About your travels!"
              maxLength="250"
              onChange={this.onChangeNote}
              value={this.state.editnote}
            />
            <button type="submit">Submit</button>
          </form>
          <div
            className="messagebox"
            style={{ color: this.state.messageboxcolor }}
          >
            {this.state.messagebox}
          </div>
        </div>
      );
    } else
      return (
        <div className="View_Note">
          <p>Your Note:</p>
          <p>{this.state.editnote}</p>
          <button type="button"
            onClick={this.editviewToggle}
          >
            Edit
          </button>
        </div>
      );
  }
}

export default Note;
