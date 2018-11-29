import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Note.css';

const Note = props => {
  let noteColor;
  switch (props.currentCountryStatus) {
    case 0:
      noteColor = 'lightgrey';
      break;
    case 1:
      noteColor = 'lavender';
      break;
    case 2:
      noteColor = 'lightgreen';
      break;
    case 3:
      noteColor = 'pink';
      break;
    case 4:
      noteColor = 'lightblue';
  };
  const NoteColor = {
    backgroundColor: noteColor
  };
  let display;
  // If a note is being edited, display input field
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
          style={NoteColor}
        />
      </div>
    );
  }
  // If a note is not being edited show the note or 'Add a note'
  else {
    display = props.country.notes ? (
      // If a note already exists, display it
      <div className="NoteBrotha">
        <div className="Notes__Hover" onClick={props.turnOnEditNote}>Click to edit</div>
        <div className="Notes__ViewMode" onClick={props.turnOnEditNote} style={NoteColor}>
          <div className="ViewMode__YourNote">Note:</div>
          <div className="ViewMode__Notes">{props.country.notes}</div>
        </div>
      </div>
    ) : (
      // If a note doesn't exist, show 'Add a note'
      <div className="Notes__NewViewMode" onClick={props.turnOnEditNote}>
        <FontAwesomeIcon className="NewViewMode__Add" icon="plus-circle" />
        <span> Add a note</span>
      </div>
    );
  }

  return <div className="Note">{display}</div>;
};

Note.propTypes = {
  country: PropTypes.object,
  handleChangeNote: PropTypes.func,
  handleUpdateNote: PropTypes.func,
  turnOnEditNote: PropTypes.func
};

export default Note;
