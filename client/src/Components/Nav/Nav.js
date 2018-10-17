import React from 'react';
import './Nav.css';

const Nav = () => {
  return (
    <div className="Nav">
      <div className="Nav__title">Scratch-N-Map</div>
      <div className="Nav__MenuItems">
        <div className="MenuItem MenuItems__friends">Friends</div>
        <div className="MenuItem MenuItems__search">Search</div>
        <div className="MenuItem MenuItems__settings">Settings</div>
        <div className="MenuItem MenuItems__signout">Sign Out</div>
      </div>
    </div>
  );
};

export default Nav;
