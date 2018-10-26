import React, { Component } from 'react';
import Nouislider from 'nouislider-react';

import './BorderBay.css';
import 'nouislider/distribute/nouislider.css';

const stayValue = ['Uninterested', 'Wishlist', 'Transited', 'Visited', 'Lived'];

export default class BorderBay extends Component {
  state = {
    values: ''
  };

  render() {
    return (
      <div className="Country_Border">
        <p className="Country_Border-Border">Border</p>
        <div className="Country_Border-Slider">
          <p className="Slider-Tag">Level of Stay</p>
          <Nouislider
            start={[0]}
            pips={{ mode: 'count', values: 5 }}
            clickablePips
            range={{
              min: 0,
              max: 5
            }}
          />

          {/* <Nouislider
            key={item}
            id={item}
            start={0}
            step={1}
            range={{ min: 0, max: 4 }}
            pip={{ mode: 'count', values: 5 }}
            clickablePips={true}
            tooltip={[{ 0: 'Wishlist', 2: 'Visited' }]}
          /> */}
        </div>
      </div>
    );
  }
}
