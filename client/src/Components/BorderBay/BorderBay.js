import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';

import './BorderBay.css';
import 'rc-slider/assets/index.css';

const marks = {
  0: 'No Interest',
  1: {
    style: {
      color: 'pink'
    },
    label: 'Wishlist'
  },
  2: {
    style: {
      color: 'yellow'
    },
    label: 'Transited'
  },
  3: {
    style: {
      color: 'green'
    },
    label: 'Visited'
  },
  4: {
    style: {
      color: 'blue'
    },
    label: 'Lived'
  }
};

export default class BorderBay extends Component {
  handleSlider(marks) {
    this.setState({ marks });
  }

  handleSliderMove = value => {
    const { user, currentCountry } = this.props;
    const body = {
      username: user.username,
      country_code: currentCountry.code,
      name: currentCountry.info.name,
      status_code: value
    };
    console.log(body);
  };

  render() {
    return (
      <div className="Country_Border">
        <p className="Country_Border-Border">Border</p>
        <div className="Country_Border-Slider">
          <p className="Slide-Tag">Level of Stay</p>
          <Slider
            className="Slider1"
            min={0}
            max={4}
            marks={marks}
            step={null}
            onChange={this.handleSliderMove}
            defaultValue={0}
            // value={0}
          />
        </div>
      </div>
    );
  }
}
