import React, { Component } from 'react';

import './Note.css';

class Note extends Component {
  state = {
    note: ""
  };

  render() {
    return (
      <div className="Note">
        <textarea className="Note_Create" rows="5" cols="500">Note</textarea>
      </div>
    );
  }
}

export default Note;
