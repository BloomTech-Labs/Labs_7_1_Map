import React, { Component } from 'react';
import Nouislider from 'nouislider-react';

import './BorderBay.css';
import 'nouislider/distribute/nouislider.css';

const marks = {
  0: {
    styles: 'red'
  },
  label: 'Uninterested',
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
            start={0}
            step={1}
            range={{ min: 0, max: 4 }}
            pip={{ mode: 'count', values: marks }}
            clickablePips={true}
            connect={true}
            tooltip={[{ 0: 'Wishlist', 2: 'Visited' }]}
          />
        </div>
      </div>
    );
  }
}
