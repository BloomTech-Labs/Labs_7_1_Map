import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import { AppContextConsumer } from '../../AppContext';
import './CountryBorder.css';
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

  log(marks) {
    console.log(marks); //eslint-disable-line
  }

  render() {
    return (
      <div className="CountryBorder">
        <AppContextConsumer>
          {value => (
            <React.Fragment>
              <p className="CountryBorder__Border">Border</p>
              <div className="CountryBorder__Slider">
                <p className="Slide-Tag">Level of Stay</p>
                <Slider
                  className="Slider1"
                  min={0}
                  max={4}
                  marks={marks}
                  step={null}
                  onChange={this.log}
                  defaultValue={0}
                  // value={0}
                />
              </div>
            </React.Fragment>
          )}
        </AppContextConsumer>
      </div>
    );
  }
}
