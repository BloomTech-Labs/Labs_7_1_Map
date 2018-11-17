import React from 'react';
import { AppContextConsumer } from '../../AppContext';
import PropTypes from 'prop-types';
import './Nav.css';
import themeColors from '../themeColors.js';

const Nav = props => {
  return (
    <AppContextConsumer>
      {({ handleFriendsDropdown, handleSignOut, AppState }) => {
        const currentTheme = AppState.user.preferences
          ? AppState.user.preferences.theme
          : 'standard';
        return (
          <div
            className="Nav"
            style={{
              backgroundColor: themeColors.background[currentTheme],
              color: themeColors.fontColor[currentTheme],
              border: `1px solid ${themeColors.borderColor[currentTheme]}`
            }}
          >
            <h1 className="Nav__title">MapScratcher</h1>

            <div className="Nav__Center">
              {AppState.user.facebook ? (
                <select
                  name="My Travels"
                  id=""
                  className="MenuItem Center__friends"
                  onChange={handleFriendsDropdown}
                >
                  <option value="user">My Travels</option>
                  {AppState.friends.map(friend => (
                    <option value={friend.id} key={friend.id}>
                      {friend.name}
                    </option>
                  ))}
                </select>
              ) : (
                <h1>My Travels</h1>
              )}
            </div>
            <div className="Nav__Right">
              <div
                className="MenuItem Right__settings"
                onClick={() => props.toggleSettings()}
              >
                SETTINGS
              </div>

              <div className="MenuItem Right__signout" onClick={handleSignOut}>
                SIGN OUT
              </div>
            </div>
          </div>
        );
      }}
    </AppContextConsumer>
  );
};

Nav.propTypes = {
  toggleSettings: PropTypes.func
};

export default Nav;
