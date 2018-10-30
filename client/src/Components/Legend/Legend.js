import React from 'react';
import { AppContextConsumer } from '../../AppContext';
import './Legend.css';

const Legend = () => {
  return (
    <div className="Legend">
      <AppContextConsumer>
        {() => (
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
        )}
      </AppContextConsumer>
    </div>
  );
};

export default Legend;
