import React, { Component } from 'react';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import Preferences from './Preferences';

import './Settings.css';

class Settings extends Component {
  state = {
    showingEmail: false,
    showingPassword: false
  };

  render() {
    return (
      <div className="Settings">
        <h1>Settings</h1>
        <Preferences />
        <ChangeEmail />
        <ChangePassword />
      </div>
    );
  }
}

export default Settings;
