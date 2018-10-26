import React from 'react';
import { AppContextConsumer } from '../../AppContext';
import './Nav.css';

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
      {({ handleSignOut }) => (
        <div className="Nav">
          <div className="Nav__title">Scratch-N-Map</div>

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
              Settings
            </div>
            <div className="MenuItem Right__signout" onClick={handleSignOut}>
              Sign Out
            </div>
          </div>
        </div>
      )}
    </AppContextConsumer>
  );
};

export default Nav;
