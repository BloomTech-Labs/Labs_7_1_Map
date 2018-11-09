import React from 'react';
import { AppContextConsumer } from '../../AppContext';
import './Nav.css';
import themeColors from '../themeColors.js';

const friendsDummyData = [
  'My Travels',
  'Friend 1',
  'Friend 2',
  'Friend 3',
  'Friend 4'
];

const Nav = props => {
  return (
    <AppContextConsumer>
      {({ handleSignOut, AppState }) => (
        <div
          className="Nav"
          style={{ backgroundColor: themeColors.background[AppState.user.preferences.theme] }}
        >
          <h1 className="Nav__title">MapScratcher</h1>

          <div className="Nav__Center">
            <select
              name="My Travels"
              id=""
              className="MenuItem Center__friends"
            >
              {friendsDummyData.map((friend, i) => {
                return i === 0 ? (
                  <option value="My Travels" key={i}>
                    My Travels
                  </option>
                ) : (
                  <option value={friend} key={i}>
                    {friend}
                  </option>
                );
              })}
            </select>
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
      )}
    </AppContextConsumer>
  );
};

export default Nav;
