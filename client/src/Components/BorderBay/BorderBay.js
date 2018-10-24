import React, { Component } from 'react';
import Slide from '../Slider/Slider';

import './BorderBay.css';
import 'rc-slider/assets/index.css';

class BorderBay extends Component {
  render() {
    return (
      <div className="Country_Border">
        <p className="Country_Border-Border">Border</p>
        <div className="Country_Border-Slider">
          <Slide />
        </div>
      </div>
    );
  }
}

export default BorderBay;
