import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import './Map.css';
import Card from '../CountryCard/Card';
import geojson from './countries.geo.json';
import wc from 'which-country';
import {
  getCountryShapeFromCode,
  getCountryInfoFromCode
} from '../../utils.js';

/* LEAFLET MAP SETUP START */
// Marker (workaround for an issue with react-leaflet)
//TODO: Change to custom icon
const markerIcon = L.icon({
  iconUrl:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 40],
  iconAnchor: [0, 0],
  popupAnchor: [13, -4]
});

// Url's for different map tiles (active tile is set in component state)
const mapTilesUrls = {
  standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  toner: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
  terrain: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
  watercolor: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
  light:
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  dark:
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
};

// Map bounds; set to maximum longitude and latitude
const corner1 = L.latLng(90, -180);
const corner2 = L.latLng(-90, 180);
const bounds = L.latLngBounds(corner1, corner2);

// Styles for the highlight of a clicked on country
const styleSelected = {
  stroke: true,
  color: 'gold',
  opacity: 1,
  fill: true,
  fillColor: 'gold',
  fillOpacity: 0
};

const styleOther = {
  stroke: true,
  color: 'gray',
  opacity: 1,
  fill: true,
  fillColor: 'gray',
  fillOpacity: 0
};

const styleWishlist = {
  stroke: true,
  color: 'purple',
  opacity: 1,
  fill: true,
  fillColor: 'purple',
  fillOpacity: 0
};

const styleVisited = {
  stroke: true,
  color: 'red',
  opacity: 1,
  fill: true,
  fillColor: 'red',
  fillOpacity: 0
};

const styleLivedIn = {
  stroke: true,
  color: 'blue',
  opacity: 1,
  fill: true,
  fillColor: 'blue',
  fillOpacity: 0
};

const styleHome = {
  stroke: true,
  color: 'green',
  opacity: 1,
  fill: true,
  fillColor: 'green',
  fillOpacity: 0
};

// Styles for the highlight of a hovered over country
const styleHover = {
  stroke: false,
  fill: true,
  fillColor: 'gold',
  fillOpacity: 0.3
};
/* LEAFLET MAP SETUP END */

/* MAIN MAP COMPONENT START */
class MapComponent extends Component {
  state = {
    zoom: 2,
    mapTile: mapTilesUrls.dark,
    countryHover: null
  };

  componentDidMount() {
    console.log(this.props.user.countries);
  }

  handleClick = async e => {
    // Get the country code of the location clicked on
    const countryCode = await wc([e.latlng.lng, e.latlng.lat]);

    const countryInfo = getCountryInfoFromCode(countryCode);

    // This can be removed once popup is not needed since
    // the lat/lng in local state isn't required by anything else.
    this.setState({ ...e.latlng });

    // Update AppContext with the info of the currently selected country
    this.props.updateCurrentCountry(countryCode, countryInfo);
  };

  handleMove = e => {
    // Get the country code of the location hovered over
    const country = wc([e.latlng.lng, e.latlng.lat]);

    // Only set state if user mouses over a different country
    if (this.state.countryHover !== country) {
      this.setState({ countryHover: country });
    }
  };

  handleZoomend = e => {
    const newZoomLevel = e.target._zoom;
    this.setState({ zoom: newZoomLevel });
  };

  render() {
    const position = this.props.userPosition
      ? [this.props.userPosition.lat, this.props.userPosition.lng]
      : [0, 0];
    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        className="MapComponent"
        minZoom={2}
        maxZoom={12}
        maxBounds={bounds}
        onClick={this.handleClick}
        onMouseMove={this.handleMove}
        onZoomend={this.handleZoomend}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url={this.state.mapTile}
        />

        {/* Layers that will be active when a country is CLICKED */}
        {/* Produces a layer for each country in the geojson file */}
        {this.props.currentCountry &&
          geojson.features.map(
            feature =>
              // Layer is only rendered if the clicked on country ID is the same
              this.props.currentCountry.code === feature.id && (
                <GeoJSON
                  key={feature.id}
                  data={getCountryShapeFromCode(feature.id)}
                  style={styleSelected}
                />
              )
          )}

        {/* Layers that will be active when a country is HOVERED */}
        {/* Produces a layer for each country in the geojson file */}
        {geojson.features.map(
          feature =>
            // Layer is only rendered if the clicked on country ID is the same
            this.state.countryHover === feature.id && (
              <GeoJSON
                key={feature.id}
                data={getCountryShapeFromCode(feature.id)}
                style={styleHover}
              />
            )
        )}

        {this.props.user.countries &&
          this.props.user.countries.map((country, i) => {
            // get countries geojson shape
            const countryShape = getCountryShapeFromCode(country.country_code);
            // TODO: get style for corresponding status code
            // render geojson layer
            return (
              <GeoJSON key={i} data={countryShape} style={styleSelected} />
            );
          })}

        {this.props.userPosition && (
          <Marker
            position={position}
            icon={markerIcon}
            opacity={0.8}
            className="userPosition"
          />
        )}
      </Map>
    );
  }
}
/* MAIN MAP COMPONENT END */

export default MapComponent;
