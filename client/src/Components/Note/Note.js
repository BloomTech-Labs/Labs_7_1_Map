import React, { Component } from 'react';
import axios from 'axios';

import NoteEdit from './NoteEdit';

import './Note.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
      messagebox: 'Please fill out your note before you submit!'
    });
    this.messageResetTimer();
  };

  //when submit checker says yes
  onSubmitSuccess = async () => {
    const noteSubmission = {
      text: this.state.editnote,
      user: this.state.user
    };
    try {
      let response = await axios.post(`${BACKEND_URL}/notes`, noteSubmission);
      let status = await response.status();
      if (status !== 201 || status !== 200) {
        this.setState({
          messagebox: 'Uh oh! Something went wrong, please try again later.'
        });
        this.messageResetTimer();
      } else {
        // this.setState({
        //   messageboxcolor: 'green',
        //   messagebox: 'Successfully Saved!'
        // });
        // this.messageResetTimer();
        this.setState({
          editview: 'false'
        });
      }
    } catch (err) {
      this.setState({
        messagebox:
          'Sorry, there seems to a problem with the server, please try again later!'
      });
      this.messageResetTimer();
    }
  };

  editviewToggle = () => {
    this.setState({ editview: 'true' });
  };
  render() {
    console.log(this.props);
    let display;
    if (this.state.editview === 'true') {
      display = (
        <NoteEdit
          submitChecker={this.submitChecker}
          user={this.state.user}
          onChangeNote={this.onChangeNote}
          messageboxcolor={this.state.messageboxcolor}
          messagebox={this.state.messagebox}
          editnote={this.state.editnote}
        />
      );
    } else {
      display = <div>+ Add a note</div>;
    }
    return <div className="Note">{display}</div>;
  }
}
//user editnote editviewToggle
export default Note;
