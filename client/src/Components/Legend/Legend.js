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
        Wishlist
      </div>
      <div className="Legend__Flyover">
        <span className="Flyover__yellow" />
        Fly Over
      </div>
      <div className="Legend__Visited">
        <span className="Visited__red" />
        Visited
      </div>
      <div className="Legend__LivedIn">
        <span className="LivedIn__blue" />
        Lived In
      </div>
      <div className="Legend__Home">
        <span className="Home__green" />
        Home
      </div>
    </div>
  );
};

export default Legend;
