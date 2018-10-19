import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const friendsDummyData = [
  'My Travels',
  'Friend 1',
  'Friend 2',
  'Friend 3',
  'Friend 4'
];

const signout = () => {
  localStorage.removeItem('jwt_token');
  window.location.replace('/');
};
const Nav = () => {
  return (
    <div className="Nav">
      <Link to="/" className="Nav__title">
        Scratch-N-Map
      </Link>

      <div className="Nav__Center">
        {/* <div className="MenuItem Center__friends">Friends</div> */}
        <select name="My Travels" id="" className="MenuItem Center__friends">
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
        <input
          className="Center__search MenuItem"
          type="search"
          placeholder="search"
        />
      </div>
      <div className="Nav__Right">
        <Link to="/settings" className="Right__settings MenuItem">
          Settings
        </Link>
        <div className="Right__signout MenuItem" onClick={signout}>
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Nav;
