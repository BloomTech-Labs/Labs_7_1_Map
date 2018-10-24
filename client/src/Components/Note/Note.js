import React, { Component } from 'react';
import axios from 'axios';

import NoteEdit from './NoteEdit';
import NoteView from './NoteView';

import './Note.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class Note extends Component {
  state = {
    editnote: '',
    viewnote: '',
    messagebox: '',
    messageboxcolor: '',
    editview: 'false',
    user: { username: '' }
  };

  componentDidMount = () => {
    this.setState({
      user: { username: 'todo: get user from context' }
    });
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
    }
  };

  editviewToggle = () => {
    this.setState({ editview: 'true' });
  };

  //pass in this.props. submitchecker and user, onchangenote, messageboxcolor, messagebox

  render() {
    //TODO: fix the className to Note and make the logic work
    if (this.state.editview === 'true') {
      return (
        <NoteEdit
          submitChecker={this.submitChecker}
          user={this.state.user}
          onChangeNote={this.onChangeNote}
          messageboxcolor={this.state.messageboxcolor}
          messagebox={this.state.messagebox}
        />
      );
    } else
      return (
        <NoteView
          user={this.state.user}
          editnote={this.state.editnote}
          editviewToggle={this.editviewToggle}
        />
      );
  }
}
//user editnote editviewToggle
export default Note;
