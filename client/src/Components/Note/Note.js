import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NoteEdit from './EditNote';

import './Note.css';

class Note extends Component {
  state = {
    notes: '',
    editMode: 'false'
  };

  componentDidMount() {
    this.setState({
      notes: this.props.country.notes
    });
  }
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
      if (this.notes) {
        display = (
          <div className="Notes__ViewMode">
            <FontAwesomeIcon
              className="VieMode__edit"
              onClick={this.edit}
              icon="edit"
            />
            <span>Edit note</span>
          </div>
        );
      } else {
        display = (
          <div className="Notes__ViewMode">
            <FontAwesomeIcon
              className="VieWMode__add"
              onClick={this.edit}
              icon="plus-circle"
            />
            <span>Add a note</span>
          </div>
        );
      }
    }
    return <div className="Note">{display}</div>;
  }
}
export default Note;
