import React, { Component } from 'react';

import './VisitBay.css';

class VisitBay extends Component {
  constructor(props) {
    super();
    this.state = {};

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(e) {
    e.preventDefault();
    this.setState()
    console.log('Color Changed');
  }

  render() {
    return (
      <div className="VisitBay">
        <button type="button" onClick={this.changeColor} className="VisitBay_Wishlist">
          Wishlist
        </button>
        <button type="button" onClick={this.changeColor} className="VisitBay_Transited">
          Transited
        </button>
        <button type="button" onClick={this.changeColor} className="VisitBay_Visited">
          Visited
        </button>
        <button type="button" onClick={this.changeColor} className="VisitBay_Lived">
          Lived
        </button>
      </div>
    );
  }
}

export default VisitBay;
