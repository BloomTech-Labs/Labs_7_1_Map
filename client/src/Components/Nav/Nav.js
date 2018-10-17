import React from 'react';
import './Nav.css';

const Nav = () => {
  return (
    <div className="Nav">
      <div className="Nav__title">Scratch-N-Map</div>
      <div className="Nav__MenuItems">
        <div className="MenuLink MenuItems__friends">Friends</div>
        <div className="MenuLink MenuItems__search">Search</div>
        <div className="MenuLink MenuItems__settings">Settings</div>
        <div className="MenuLink MenuItems__signout">Sign Out</div>
      </div>
    </div>
  );
};

export default Nav;
