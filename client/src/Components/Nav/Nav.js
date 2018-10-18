import React from 'react';
import './Nav.css';

const friendsDummyData = [
  'My Travels',
  'Friend 1',
  'Friend 2',
  'Friend 3',
  'Friend 4'
];

const Nav = () => {
  return (
    <div className="Nav">
      <div className="Nav__title">Scratch-N-Map</div>

      <div className="Nav__Center">
        {/* <div className="MenuItem Center__friends">Friends</div> */}
        <select name="My Travels" id="" className="MenuItem Center__friends">
          {friendsDummyData.map((friend, i) => {
            return i === 0 ? (
              <option value="My Travels">My Travels</option>
            ) : (
              <option value={friend} key={i}>
                {friend}
              </option>
            );
          })}
        </select>
        <input
          className="MenuItem Center__search"
          type="search"
          placeholder="search"
        />
      </div>
      <div className="Nav__Right">
        <div className="MenuItem Right__settings">Settings</div>
        <div className="MenuItem Right__signout">Sign Out</div>
      </div>
    </div>
  );
};

export default Nav;
