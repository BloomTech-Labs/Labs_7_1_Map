import React, { Component } from 'react';
import StayButtons from './StayButtons';

import './VisitBay.css';

class VisitBay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeColor(e) {
    // e.preventDefault();
    console.log('Color Changed');
  }

  render() {
    return (
      <div className="VisitBay">
        <StayButtons color={this.changeColor} />
      </div>
    );
  }
}

export default VisitBay;
