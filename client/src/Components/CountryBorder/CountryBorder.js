import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import ScratchCard from 'react-scratchcard';

import { getBoundingBox } from '../../utils';

import './CountryBorder.css';
import 'rc-slider/assets/index.css';
import travellingImg from '../../travelling.jpg';

const canvasWidth = 300;
const canvasHeight = 150;

const settings = {
  width: canvasWidth,
  height: canvasHeight,
  image: travellingImg,
  finishPercent: 95
};

const draw = (context, canvasWidth, canvasHeight, bounds, geometry) => {
  context.fillStyle = '#333';

  // determine the scale
  const xScale = canvasWidth / Math.abs(bounds.xMax - bounds.xMin);
  const yScale = canvasHeight / Math.abs(bounds.yMax - bounds.yMin);
  const scale = xScale < yScale ? xScale : yScale;

  // Handles countries made up of a single connected polygon
  if (geometry.type === 'Polygon') {
    const coordinates = geometry.coordinates[0];
    coordinates
      .map(point => [
        (point[0] - bounds.xMin) * scale,
        (bounds.yMax - point[1]) * scale
      ])
      .forEach((point, index) => {
        if (index === 0) {
          context.beginPath();
          context.moveTo(point[0], point[1]);
        } else {
          context.lineTo(point[0], point[1]);
        }
      });
    context.closePath();
    context.fill();
    // context.stroke();
  }
  // Handles countries made up of multiple unconnected polygons
  else if (geometry.type === 'MultiPolygon') {
    //multiPolygonBoundingBox(geometry.coordinates);
    const shape = geometry.coordinates;
    shape.forEach((polygon, i) => {
      const coordinates = polygon[0];
      coordinates
        .map(point => [
          (point[0] - bounds.xMin) * scale,
          (bounds.yMax - point[1]) * scale
        ])
        .forEach((point, index) => {
          if (index === 0) {
            context.beginPath();
            context.moveTo(point[0], point[1]);
          } else {
            context.lineTo(point[0], point[1]);
          }
        });
      context.closePath();
      context.fill();
      // context.stroke();
    });
  } else {
    console.log('NONE Drawn');
  }
};

export default class CountryBorder extends Component {
  state = {
    marks: {
      0: 'None',
      1: {
        style: {
          color: 'purple'
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
          color: 'red'
        },
        label: 'Visited'
      },
      4: {
        style: {
          color: 'blue'
        },
        label: 'Lived'
      }
    }
  };
  componentDidMount() {
    this.drawBorder();
  }
  componentDidUpdate() {
    this.drawBorder();
  }
  drawBorder = () => {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // only draw if we have the geometry
    if (this.props.geometry) {
      draw(
        context,
        canvasWidth,
        canvasHeight,
        getBoundingBox(this.props.geometry),
        this.props.geometry
      );
    } else {
      this.props.closeCountryPanel();
    }
  };

  log(marks) {
    console.log(marks); //eslint-disable-line
  }

  render() {
    const notScratched = !this.props.scratched ? true : false;
    let counrtyBorderMap;
    if (this.props.scratched) {
      counrtyBorderMap = (
        <React.Fragment>
          <canvas
            ref="canvas"
            className="CountryBorder__Canvas"
            width={canvasWidth}
            height={canvasHeight}
          />
        </React.Fragment>
      );
    } else {
      counrtyBorderMap = (
        <ScratchCard
          className="CountryBorder__Canvas"
          {...settings}
          onComplete={this.props.handleScratched}
        >
          <canvas
            ref="canvas"
            className="CountryBorder__Border"
            width={canvasWidth}
            height={canvasHeight}
          />
        </ScratchCard>
      );
    }
    return (
      <div className="CountryBorder">
        {counrtyBorderMap}
        <div className="CountryBorder__SliderContainer">
          <Slider
            className="Slider"
            min={0}
            max={4}
            marks={this.state.marks}
            step={null}
            onChange={this.props.handleSliderMove}
            defaultValue={0}
            value={this.props.currentCountryStatus}
            disabled={notScratched}
          />
        </div>
      </div>
    );
  }
}
