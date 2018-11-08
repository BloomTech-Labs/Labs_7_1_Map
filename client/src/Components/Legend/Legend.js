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
        <span className="Wishlist__purple" style={{ "backgroundColor": colorPalette[1] }}/>
        Wishlist
      </div>
      <div className="Legend__Transited">
        <span className="Transited__yellow"  style={{ "backgroundColor": colorPalette[2] }}/>
        Transited
      </div>
      <div className="Legend__Visited">
        <span className="Visited__red"  style={{ "backgroundColor": colorPalette[3] }}/>
        Visited
      </div>
      <div className="Legend__Lived">
        <span className="Lived__blue"  style={{ "backgroundColor": colorPalette[4] }}/>
        Lived
      </div>
    </div>
  );
};

export default Legend;
