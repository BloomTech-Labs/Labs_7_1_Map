import React, { Component } from 'react';

import './Preferences.css';

class Preferences extends Component {
  state = {
    autoScratch: false
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="Settings__Preferences">
        <div className="Preferences__theme">
          <h5>Theme</h5>
          <select className="theme" name="Theme" onChange={this.handleChange}>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        <div className="Preferences__autoScratch">
          <h5>Auto Scratch Mode</h5>
          <input
            type="checkbox"
            name="autoScratch"
            checked={this.state.autoScratch}
            onChange={e => this.handleChange(e)}
          />
        </div>
      </div>
    );
  }
}

export default Preferences;
