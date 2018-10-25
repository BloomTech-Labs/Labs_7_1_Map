import React from 'react';

import './StayButtons.css';

const StayButtons = props => {
  const onChange = props.color;

  return (
    <div className="StayButtons">
      <button style={{countryBorder: props.countryBorder}} type="button" onClick={onChange} className="StayButtons_Wishlist">
        Wishlist
      </button>
      <button
        type="button"
        onClick={onChange}
        className="StayButtons_Transited"
      >
        Transited
      </button>
      <button type="button" onClick={onChange} className="StayButtons_Visited">
        Visited
      </button>
      <button type="button" onClick={onChange} className="StayButtons_Lived">
        Lived
      </button>
    </div>
  );
};

export default StayButtons;