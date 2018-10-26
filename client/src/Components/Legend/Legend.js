import React from 'react';
import './Legend.css';

const Legend = () => {
  return (
    <div className="Legend">
      <ul>
        {/* <input type="checkbox" className="Legend__showFriends" /> Show Friends */}
        <li>
          <div className="Legend__swatch NoInterest" />
          No Interest
        </li>
        <li>
          <div className="Legend__swatch Wishlist" />
          Wishlist
        </li>
        <li>
          <div className="Legend__swatch Visited" />
          Visited
        </li>
        <li>
          <div className="Legend__swatch LivedIn" />
          Lived In
        </li>
        <li>
          <div className="Legend__swatch Home" />
          Home
        </li>
      </ul>
    </div>
  );
};

export default Legend;
