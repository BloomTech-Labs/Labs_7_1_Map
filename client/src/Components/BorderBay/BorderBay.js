import 'rc-slider/assets/index.css';

import React, { Component } from 'react';
import Slider from 'rc-slider';
import './BorderBay.css';

const style = {
  float: 'left',
  width: 160,
  height: 400,
  marginBottom: 160,
  marginLeft: 50
};
const parentStyle = { overflow: 'hidden' };

const marks = {
  '-10': '-10°C',
  0: <strong>0°C</strong>,
  26: '26°C',
  37: '37°C',
  50: '50°C',
  100: {
    style: {
      color: 'red'
    },
    label: <strong>100°C</strong>
  }
};

class BorderBay extends Component {
  render() {
    return (
      <div className="Country_Border" style={parentStyle}>
        <div style={style}>
          <Slider
            vertical
            min={-10}
            marks={marks}
            included={false}
            defaultValue={20}
          />
        </div>
        <p className="Country_Border-Border">Border</p>
      </div>
    );
  }
}

export default BorderBay;
