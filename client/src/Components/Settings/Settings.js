import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../AppContext';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import Preferences from './Preferences';

import './Settings.css';
import themeColors from '../themeColors.js';

class Settings extends Component {

  render() {
    return (
      <AppContextConsumer>
        {({ AppState, handleUpdatePreferences, handleResetMap, handleChangeEmailClick, handleChangePasswordClick }) => {
          const currentTheme = AppState.user.preferences
            ? AppState.user.preferences.theme
            : 'standard';
          return (
            <div
              className={
                AppState.showingSettings
                  ? 'Settings Settings-open'
                  : 'Settings Settings-closed'
              }
              style={{
                backgroundColor: themeColors.background[currentTheme],
                color: themeColors.fontColor[currentTheme],
                border: `1px solid ${themeColors.borderColor[currentTheme]}`
              }}
            >
              <div className="Settings__Header">Settings</div>
              <Preferences
                user={AppState.user}
                handleUpdatePreferences={handleUpdatePreferences}
              />
              {(!AppState.user.facebook || !AppState.user.facebook.id) && (
                <React.Fragment>
                  <ChangeEmail
                    user={AppState.user}
                    handleChangeEmailClick={handleChangeEmailClick}
                    showingChangeEmail={AppState.showingChangeEmail}
                  />
                  <ChangePassword
                    user={AppState.user}
                    handleChangePasswordClick={handleChangePasswordClick}
                    showingChangePassword={AppState.showingChangePassword}
                  />
                </React.Fragment>
              )}
              <button onClick={handleResetMap} className="Settings__ResetMap">
                Reset Map
              </button>
            </div>
          );
        }}
      </AppContextConsumer>
    );
  }
}

export default Settings;
