import React, { Component } from 'react';

import './VisitedBay.css';

class VisitedBay extends Component {
  render() {
    return (
      <div className="VisitedBay">
        <button>Wishlist</button>
        <button>Transited</button>
        <button>Visited</button>
        <button>Lived</button>
      </div>
    );
  }
}

export default VisitedBay;
