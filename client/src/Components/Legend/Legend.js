import React from 'react';
import './Legend.css';
import { colorPalette } from '../Map/countryStyles.js';

const Legend = () => {
  return (
    <div className="Legend">
      {/* <div className="Legend__NoInterest"> */}
      {/*   <span className="NoInterest__gray" /> */}
      {/*   No Interest */}
      {/* </div> */}
      <div className="Legend__Wishlist">
        <span className="Wishlist__purple" style={{ "backgroundColor": colorPalette.wishlist }}/>
        Wish List
      </div>
      <div className="Legend__Transited">
        <span className="Transited__yellow"  style={{ "backgroundColor": colorPalette.transited }}/>
        Transited
      </div>
      <div className="Legend__Visited">
        <span className="Visited__red"  style={{ "backgroundColor": colorPalette.visited }}/>
        Visited
      </div>
      <div className="Legend__Lived">
        <span className="Lived__blue"  style={{ "backgroundColor": colorPalette.livedIn }}/>
        Lived
      </div>
    </div>
  );
};

export default Legend;
