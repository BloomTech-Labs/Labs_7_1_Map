import React from 'react';
import './Nav.css';

const Nav = () => {
  return (
    <div className="Nav">
      <div className="Nav__title">Scratch-N-Map</div>

      <div className="Nav__Center">
        <div className="MenuItem Center__friends">Friends</div>
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
