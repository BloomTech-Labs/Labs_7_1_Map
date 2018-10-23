import React, { Component } from 'react';
import axios from 'axios';
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

  render() {
    //TODO: fix the className to Note and make the logic work
 
    const { username } = this.state.user;
    if (this.state.editview === 'true') {
      return (
     
        <div className="Edit-Note">
          <form onSubmit={this.submitChecker}>
            <textarea
              input="text"
              className="Note_Create"
              rows="5"
              placeholder={
                username + ', what are your thoughts about this place?'
              }
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
          <p>{username + 's note:'}</p>
          <p>{this.state.editnote}</p>
          <button type="button" onClick={this.editviewToggle}>
            Edit
          </button>
        </div>
      );

  }
}

export default Note;
