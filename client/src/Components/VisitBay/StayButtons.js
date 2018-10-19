import React from 'react';

// import './VisitBay.css';

const StayButtons = props => {
  const onChange = props.onChange;
  
  return (
    <div className="VisitBay">
      <button type="button" onClick={onChange} className="VisitBay_Wishlist">
        Wishlist
      </button>
      <button type="button" onClick={onChange} className="VisitBay_Transited">
        Transited
      </button>
      <button type="button" onClick={onChange} className="VisitBay_Visited">
        Visited
      </button>
      <button type="button" onClick={onChange} className="VisitBay_Lived">
        Lived
      </button>
    </div>
  );
};

export default StayButtons;
