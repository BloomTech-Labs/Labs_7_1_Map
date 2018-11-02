import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import ScratchCard from 'react-scratchcard';

import './CountryBorder.css';
import 'rc-slider/assets/index.css';
import travellingImg from '../../travelling.jpg';

const settings = {
  width: 300,
  height: 150,
  image: travellingImg,
  finishPercent: 100,
  onComplete: () => console.log('The card is now clear!')
};

const canvasWidth = 300;
const canvasHeight = 150;

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

const polygonBoundingBox = coordinates => {
  const bounds = {
    xMin: coordinates[0][0],
    xMax: coordinates[0][0],
    yMin: coordinates[0][1],
    yMax: coordinates[0][1]
  };

  coordinates.forEach(point => {
    if (point[0] < bounds.xMin) bounds.xMin = point[0];
    if (point[0] > bounds.xMax) bounds.xMax = point[0];
    if (point[1] < bounds.yMin) bounds.yMin = point[1];
    if (point[1] > bounds.yMax) bounds.yMax = point[1];
  });

  return bounds;
};

const multiPolygonBoundingBox = shape => {
  const bounds = {
    xMin: shape[0][0][0][0],
    xMax: shape[0][0][0][0],
    yMin: shape[0][0][0][1],
    yMax: shape[0][0][0][1]
  };

  shape.forEach(coordinates => {
    coordinates[0].forEach(point => {
      if (point[0] < bounds.xMin) bounds.xMin = point[0];
      if (point[0] > bounds.xMax) bounds.xMax = point[0];
      if (point[1] < bounds.yMin) bounds.yMin = point[1];
      if (point[1] > bounds.yMax) bounds.yMax = point[1];
    });
  });
  return bounds;
};

const getBoundingBox = geometry => {
  switch (geometry.type) {
    case 'Polygon':
      return polygonBoundingBox(geometry.coordinates[0]);
    case 'MultiPolygon':
      return multiPolygonBoundingBox(geometry.coordinates);
    default:
      console.log('NONE');
  }
};

const draw = (context, canvasWidth, canvasHeight, bounds, geometry) => {
  //context.fillStyle = '#333';

  // determine the scale
  const xScale = canvasWidth / Math.abs(bounds.xMax - bounds.xMin);
  const yScale = canvasHeight / Math.abs(bounds.yMax - bounds.yMin);
  const scale = xScale < yScale ? xScale : yScale;

  switch (geometry.type) {
    case 'Polygon':
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
      context.stroke();
      break;
    case 'MultiPolygon':
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
        context.stroke();
      });

      break;
    default:
      console.log('NONE Drawn');
  }
};

export default class CountryBorder extends Component {
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
    }
  };
  handleSlider(marks) {
    this.setState({ marks });
  }

  log(marks) {
    console.log(marks); //eslint-disable-line
  }

  render() {
    return (
      <div className="CountryBorder">
        <ScratchCard {...settings}>
          <canvas
            ref="canvas"
            className="CountryBorder__Border"
            width={canvasWidth}
            height={canvasHeight}
          />
        </ScratchCard>
        <div className="CountryBorder__Slider">
          <p className="Slide-Tag">Level of Stay</p>
          <Slider
            className="Slider1"
            min={0}
            max={4}
            marks={marks}
            step={null}
            onChange={this.props.handleSliderMove}
            defaultValue={0}
            value={this.props.currentCountryStatus}
          />
        </div>
      </div>
    );
  }
}
