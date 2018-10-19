import React, { Component } from 'react';
// import axios from 'axios';

import './Note.css';

class Note extends Component {
  state = {
    note: '',
    messagebox: '',
    messageboxcolor: ''
  };

  //this happens when something changes on the form
  onChangeNote = event => {
    this.setState({ note: event.target.value });
  };

  //when submit button is clicked
  submitChecker = event => {
    event.preventDefault();
    if (this.state.note !== '') {
      this.onSubmitSuccess(event);
    } else {
      this.onSubmitFailure();
    }
  };

  //when submit checker says no
  onSubmitFailure = () => {
    console.log('Please fill out your note before submitting!');
    this.setState({
      messagebox: 'Please fill out your note before submitting!'
    });
    this.setState({ messageboxcolor: 'red' });
  };

  //when submit checker says yes
  onSubmitSuccess = () => {
    const noteSubmission = {
      text: this.state.note
    };
    //put axios here
    console.log(noteSubmission);
    this.setState({
      messagebox: 'Good Note!',
      messageboxcolor: 'green'
    });
  };

  render() {
    return (
      <div className="Note">
        <form onSubmit={this.submitChecker}>
          <textarea
            input="text"
            className="Note_Create"
            rows="5"
            placeholder="About your travels!"
            maxLength="250"
            onChange={this.onChangeNote}
            value={this.state.note}
          />
          <button type="submit">Submit</button>
        </form>
        <button type="button">Edit</button>
        <div
          className='messagebox'
          style={{ color: this.state.messageboxcolor }}
        >
          {this.state.messagebox}
        </div>
      </div>
    );
  }
}

export default Note;
