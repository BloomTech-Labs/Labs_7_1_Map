import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../AppContext';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import Preferences from './Preferences';

import './Settings.css';
import themeColors from '../themeColors.js';

class Settings extends Component {
  state = {
    showingChangeEmail: false,
    showingChangePassword: false
  };

  handleChangeEmailClick = () => {
    if (this.state.showingChangePassword)
      this.setState({
        showingChangePassword: false,
        showingChangeEmail: !this.state.showingChangeEmail
      });
    else
      this.setState({
        showingChangeEmail: !this.state.showingChangeEmail
      });
  };

  handleChangePasswordClick = () => {
    if (this.state.showingChangeEmail)
      this.setState({
        showingChangeEmail: false,
        showingChangePassword: !this.state.showingChangePassword
      });
    else
      this.setState({
        showingChangePassword: !this.state.showingChangePassword
      });
  };

  render() {
    return (
      <AppContextConsumer>
        {({ AppState, handleUpdatePreferences }) => {
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
              <ChangeEmail
                user={AppState.user}
                handleChangeEmailClick={this.handleChangeEmailClick}
                showingChangeEmail={this.state.showingChangeEmail}
              />
              <ChangePassword
                user={AppState.user}
                handleChangePasswordClick={this.handleChangePasswordClick}
                showingChangePassword={this.state.showingChangePassword}
              />
            </div>
          );
        }}
      </AppContextConsumer>
    );
  }
}

Settings.propTypes = {
  showingSettings: PropTypes.bool
};

export default Settings;
