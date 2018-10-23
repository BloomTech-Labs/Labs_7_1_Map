import React, { Component } from 'react';

import './Note.css';

class Note extends Component {
  state = {
    note: ''
  };

  render() {
    return (
      <div className="Note">
        <textarea
          input="text"
          className="Note_Create"
          rows="5"
          placeholder="Enter travel tip"
          maxLength="150"
        />
        <button type="button">Edit</button>
      </div>
    );
  }
}

export default Note;
