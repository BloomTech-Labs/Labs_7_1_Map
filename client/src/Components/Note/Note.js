import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Note.css';

class Note extends Component {
  render() {
    let display;
    if (this.props.country.editNoteMode) {
      display = (
        <div className="Notes__EditMode">
          <FontAwesomeIcon
            className="EditMode__save"
            onClick={this.props.handleUpdateNotes}
            icon="save"
          />
          <textarea
            name="notes"
            onChange={this.props.handleChangeNote}
            value={this.props.country.notes}
          />
        </div>
      );
    } else {
      if (this.props.country.notes) {
        display = (
          <div className="Notes__ViewMode">
            <FontAwesomeIcon
              className="ViewMode__edit"
              onClick={this.props.turnOnEditNote}
              icon="edit"
            />
            <div className="ViewMode__Notes">{this.props.country.notes}</div>
          </div>
        );
      } else {
        display = (
          <div className="Notes__ViewMode">
            <FontAwesomeIcon
              className="ViewMode__add"
              onClick={this.props.turnOnEditNote}
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
