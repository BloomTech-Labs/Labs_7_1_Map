import React, { Component } from 'react';

import './Preferences.css';

class Preferences extends Component {
  state = {
    autoscratch: false
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="Settings__Preferences">
        <h4>Preferences</h4>
        <div className="Preferences__theme">
          <h5>Theme</h5>
          <select className="Theme" name="theme" onChange={this.handleChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="Preferences__autoscratch">
          <h5>Auto Scratch Mode</h5>
          <input
            type="checkbox"
            name="autoscratch"
            checked={this.state.autoscratch}
            value={this.state.autoscratch}
            onChange={e => this.handleChange(e)}
          />
        </div>
        <button onClick={() => this.props.handleUpdatePreferences(this.state)}>
          Submit
        </button>
      </div>
    );
  }
}

export default Preferences;
