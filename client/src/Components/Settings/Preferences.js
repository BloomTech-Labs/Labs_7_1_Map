import React, { Component } from 'react';
import mapTilesUrls from '../Map/mapSetup.js';

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
    const theme =
      this.props.user && this.props.user.preferences
        ? this.props.user.preferences.theme
        : 'dark';
    return (
      <div className="Settings__Preferences">
        <h4>Preferences</h4>
        <div className="Preferences__theme">
          <h5>Theme</h5>
          <select
            className="Theme"
            defaultValue={theme}
            name="theme"
            onChange={this.handleChange}
          >
            <option value="light">light</option>
            <option value="dark">dark</option>
            <option value="watercolor">watercolor</option>
            <option value="toner">toner</option>
            <option value="standard">standard</option>
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
          Apply
        </button>
      </div>
    );
  }
}

export default Preferences;
