import React, { Component } from 'react';

import './VisitBay.css';

class VisitBay extends Component {
  state = {

  }

  // onClick() {
  //   this.
  // }

  render() {
    return (
      <div className="VisitBay">
        <button type="button" onClick={''} className="VisitBay_Wishlist">
          Wishlist
        </button>
        <button type="button" onClick={''} className="VisitBay_Transited">
          Transited
        </button>
        <button type="button" onClick={''} className="VisitBay_Visited">
          Visited
        </button>
        <button type="button" onClick={''} className="VisitBay_Lived">
          Lived
        </button>
      </div>
    );
  }
}

export default VisitBay;
