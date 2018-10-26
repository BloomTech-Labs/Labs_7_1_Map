import React, { Component } from 'react';
import Nouislider from 'nouislider-react';

import './BorderBay.css';
import 'nouislider/distribute/nouislider.css';

const StayValue = {
  0: 'Uninterested',
  1: 'Wishlist',
  2: 'Transited',
  3: 'Visited',
  4: 'Lived'
};

export default class BorderBay extends Component {
  render() {
    return (
      <div className="Country_Border">
        <p className="Country_Border-Border">Border</p>
        <div className="Country_Border-Slider">
          <p className="Slider-Tag">Level of Stay</p>
          <Nouislider
            accessibility
            start={0}
            step={1}
            pips={{
              mode: 'range',
              format: {
                to: function(change) {
                  return StayValue[change];
                }
              }
            }}
            clickablePips
            range={{
              min: [0, 1],
              '25%': [1, 2],
              '50': [2, 3],
              '75': [3, 2],
              max: [4, 3]
            }}
          />
        </div>
      </div>
    );
  }
}
