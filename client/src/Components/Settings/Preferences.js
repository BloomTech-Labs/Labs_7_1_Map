import React, { Component } from 'react';

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
      <div>
        <label>
          Theme
          <select
            className="theme"
            name="Theme"
            onChange={this.handleChange}
          >
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
    );
  }
}

export default Preferences;
