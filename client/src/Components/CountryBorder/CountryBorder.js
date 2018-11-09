import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import ScratchCard from 'react-scratchcard';

import { getBoundingBox } from '../../utils';
import { colorPalette } from '../Map/countryStyles.js';

import './CountryBorder.css';
import 'rc-slider/assets/index.css';
import travellingImg from '../../travelling.jpg';

const canvasWidth = 300;
const canvasHeight = 150;

const scratchcardSettings = {
  width: canvasWidth,
  height: canvasHeight,
  image: travellingImg,
  finishPercent: 95
};

const draw = (context, canvasWidth, canvasHeight, bounds, geometry, color) => {
  context.fillStyle = color || '#333';

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
    shape.forEach(polygon => {
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
  }
};

export default class CountryBorder extends Component {
  state = {
    marks: {
      0: {
        style: {
          color: 'gray'
        },
        label: 'None'
      },
      1: {
        style: {
          color: colorPalette[1]
        },
        label: 'Wishlist'
      },
      2: {
        style: {
          color: colorPalette[2]
        },
        label: 'Transited'
      },
      3: {
        style: {
          color: colorPalette[3]
        },
        label: 'Visited'
      },
      4: {
        style: {
          color: colorPalette[4]
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
    // Get the correct fill color based on status. Need to check if
    // this.props.currentCountryStatus exists to prevent any crashes
    const color = this.props.currentCountryStatus
      ? colorPalette[this.props.currentCountryStatus]
      : 'black';
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    if (context) context.clearRect(0, 0, canvasWidth, canvasHeight);
    // only draw if we have the geometry
    if (this.props.geometry) {
      draw(
        context,
        canvasWidth,
        canvasHeight,
        getBoundingBox(this.props.geometry),
        this.props.geometry,
        color
      );
    }
  };

  render() {
    return (
      <div className="CountryBorder">
        {this.props.scratched ? (
          <React.Fragment>
            <canvas
              ref="canvas"
              className="CountryBorder__Canvas"
              width={canvasWidth}
              height={canvasHeight}
            />
          </React.Fragment>
        ) : (
          <ScratchCard
            className="CountryBorder__Canvas"
            {...scratchcardSettings}
            onComplete={this.props.handleScratched}
          >
            <canvas
              ref="canvas"
              className="CountryBorder__Border"
              width={canvasWidth}
              height={canvasHeight}
            />
          </ScratchCard>
        )}
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
            disabled={!this.props.scratched}
          />
        </div>
      </div>
    );
  }
}
