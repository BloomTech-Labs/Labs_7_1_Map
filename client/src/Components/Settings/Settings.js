import React, { Component } from 'react';

import { AppContextConsumer } from '../../AppContext';
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
      <AppContextConsumer>
        {({ AppState }) => (
          <div
            className={
              this.props.showingSettings
                ? 'Settings Settings-open'
                : 'Settings Settings-closed'
            }
          >
            <h1>Settings</h1>
            <Preferences user={AppState.user} />
            <ChangeEmail user={AppState.user} />
            <ChangePassword user={AppState.user} />
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

export default Settings;
