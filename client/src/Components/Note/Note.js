import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Note.css';

const Note = props => {
  let display;
  if (props.country.editNoteMode) {
    display = (
      <div className="Notes__EditMode">
        <FontAwesomeIcon
          className="EditMode__save"
          onClick={props.handleUpdateNotes}
          icon="save"
        />
        <textarea
          name="notes"
          onChange={props.handleChangeNote}
          value={props.country.notes}
        />
      </div>
    );
  } else {
    if (props.country.notes) {
      display = (
        <div className="Notes__ViewMode">
          <FontAwesomeIcon
            className="ViewMode__edit"
            onClick={props.turnOnEditNote}
            icon="edit"
          />
          <div className="ViewMode__Notes">{props.country.notes}</div>
        </div>
      );
    } else {
      display = (
        <div className="Notes__ViewMode">
          <FontAwesomeIcon
            className="ViewMode__add"
            onClick={props.turnOnEditNote}
            icon="plus-circle"
          />
          <span>Add a note</span>
        </div>
      );
    }
  }
  return <div className="Note">{display}</div>;
};
export default Note;
