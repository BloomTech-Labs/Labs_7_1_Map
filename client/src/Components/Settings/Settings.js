import React, { Component } from 'react';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';


class Settings extends Component {
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
      <div className="Settings">
        <ChangeEmail />
        <ChangePassword />

        {/*Preferences*/}
        <div>
          <label>
            Theme
            <select className="theme" name="Theme">
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </label>

          <label htmlFor="autoScratch">
            Auto Scratch Mode
            <input
              type="checkbox"
              name="autoScratch"
              checked={this.state.autoScratch}
              onChange={e => this.handleChange(e)}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Settings;
