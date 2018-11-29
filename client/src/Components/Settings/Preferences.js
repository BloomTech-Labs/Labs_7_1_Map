import React, { Component } from 'react';
import PropTypes from 'prop-types';

import themeColors from '../themeColors.js';
import './Preferences.css';

class Preferences extends Component {
  state = {
    autoscratch: false,
    theme: 'standard'
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    if (this.props.user && this.props.user.preferences)
      this.setState({ theme: this.props.user.preferences.theme });
  }

  render() {
    const currentTheme =
      this.props.user && this.props.user.preferences
        ? this.props.user.preferences.theme
        : 'dark';
    return (
      <div className="Settings__Preferences">
        <div className="Preferences__theme">
          <h5>Theme</h5>
          <select
            className="Theme"
            defaultValue={currentTheme}
            name="theme"
            onChange={this.handleChange}
            style={{
              backgroundColor: themeColors.background[currentTheme],
              color: themeColors.fontColor[currentTheme],
              border: `1px solid ${themeColors.borderColor[currentTheme]}`
            }}
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

Preferences.propTypes = {
  user: PropTypes.object,
  handleUpdatePreferences: PropTypes.any
}

export default Preferences;
