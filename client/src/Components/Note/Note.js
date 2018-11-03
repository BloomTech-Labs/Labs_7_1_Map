import React, { Component } from 'react';

import NoteEdit from './EditNote';

import './Note.css';

class Note extends Component {
  state = {
    notes: '',
    editMode: 'false'
  };

  //this happens when something changes on the form
  handleChange = e => {
    this.setState({ notes: e.target.value });
  };

  edit = () => {
    this.setState({ editMode: 'true' });
  };

  render() {
    let display;
    if (this.state.editMode === 'true') {
      display = (
        /*
        <EditNote
          submitChecker={this.submitChecker}
          user={this.state.user}
          onChangeNote={this.onChangeNote}
          messageboxcolor={this.state.messageboxcolor}
          messagebox={this.state.messagebox}
          editnote={this.state.editnote}
        />
        */
        <div>Edit Mode</div>
      );
    } else {
      display = <div>+ Add a note</div>;
    }
    return <div className="Note">{display}</div>;
  }
}
export default Note;
