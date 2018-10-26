import React, { Component } from 'react';
import Nouislider from 'nouislider-react';

import './BorderBay.css';
import 'nouislider/distribute/nouislider.css';

// import Slider from 'rc-slider/lib/Slider';
// import 'rc-slider/assets/index.css';

// const marks = {
//   0: 'No Interest',
//   1: {
//     style: {
//       color: 'pink'
//     },
//     label: 'Wishlist'
//   },
//   2: {
//     style: {
//       color: 'yellow'
//     },
//     label: 'Transited'
//   },
//   3: {
//     style: {
//       color: 'green'
//     },
//     label: 'Visited'
//   },
//   4: {
//     style: {
//       color: 'blue'
//     },
//     label: 'Lived'
//   }
// };

// function log(value) {
//   console.log(value); //eslint-disable-line
// }

export default class BorderBay extends Component {
  render() {
    return (
      <div className="Country_Border">
        <p className="Country_Border-Border">Border</p>
        <div className="Country_Border-Slider">
          <p className="Slide-Tag">Level of Stay</p>
          <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />


          {/* <Slider
            className="Slider1"
            min={0}
            max={4}
            marks={marks}
            step={null}
            onChange={log}
            defaultValue={0}
            // value={0}
          /> */}
        </div>
      </div>
    );
  }
}
