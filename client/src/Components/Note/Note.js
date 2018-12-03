import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Note.css';

const Note = props => {
  let defaultColors = {
    backgroundColor: `${props.background}`,
    color: `${props.color}`,
    fontColor: `${props.fontColor}`,
    borderColor: `${props.borderColor}`
  }
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
        />
      </div>
    );
  }
  // If a note is not being edited show the note or 'Add a note'
  else {
    display = props.country.notes ? (
      // If a note already exists, display it
      <div className="Notes__NotesContainer">
        <div className="NotesContainer__Hover" onClick={props.turnOnEditNote}>Click to edit</div>
        <div className="NotesContainer__ViewMode" onClick={props.turnOnEditNote}>
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

  return <div className="Note" style={defaultColors}>{display}</div>;
};

Note.propTypes = {
  country: PropTypes.object,
  handleChangeNote: PropTypes.func,
  handleUpdateNote: PropTypes.func,
  turnOnEditNote: PropTypes.func,
  currentCountryStatus: PropTypes.number
};

export default Note;
