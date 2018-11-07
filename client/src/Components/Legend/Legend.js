import React from 'react';
import './Legend.css';

const Legend = () => {
  return (
    <div className="Legend">
      <div className="Legend__NoInterest">
        <span className="NoInterest__gray" />
        No Interest
      </div>
      <div className="Legend__Wishlist">
        <span className="Wishlist__purple" />
        Wish List
      </div>
      <div className="Legend__Transited">
        <span className="Transited__yellow" />
        Transited
      </div>
      <div className="Legend__Visited">
        <span className="Visited__red" />
        Visited
      </div>
      <div className="Legend__Lived">
        <span className="Lived__blue" />
        Lived
      </div>
    </div>
  );
};

export default Legend;
