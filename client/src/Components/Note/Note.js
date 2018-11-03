import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Note.css';

class Note extends Component {
  state = {
    notes: '',
    editMode: false
  };

  componentDidMount() {
    this.setState({
      notes: this.props.country.notes,
      editMode: this.props.country.editNoteMode
    });
  }

  //this happens when something changes on the form
  handleChange = e => {
    this.setState({ notes: e.target.value });
  };

  edit = () => {
    this.setState({ editMode: true });
  };
  updateNote = () => {
    this.props.handleUpdateNotes(this.state.notes);
    this.setState({ editMode: false });
  };

  render() {
    let display;
    if (this.state.editMode) {
      display = (
        <div className="Notes__EditMode">
          <FontAwesomeIcon
            className="EditMode__save"
            onClick={this.updateNote}
            icon="save"
          />
          <textarea
            name="notes"
            onChange={this.handleChange}
            value={this.state.notes}
          />
        </div>
      );
    } else {
      if (this.state.notes) {
        display = (
          <div className="Notes__ViewMode">
            <FontAwesomeIcon
              className="ViewMode__edit"
              onClick={this.edit}
              icon="edit"
            />
            <div className="ViewMode__Notes">{this.state.notes}</div>
          </div>
        );
      } else {
        display = (
          <div className="Notes__ViewMode">
            <FontAwesomeIcon
              className="ViewMode__add"
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
