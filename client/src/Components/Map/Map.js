import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import wc from 'which-country';
import geojson from './countries.geo.json';
import {
  getCountryShapeFromCode,
  getCountryInfoFromCode
} from '../../utils.js';
import {
  styleSelected,
  styleHover,
  countryStatusStyles
} from './countryStyles.js';
import { mapTilesUrls, bounds } from './mapSetup.js';

import './Map.css';

/* MAIN MAP COMPONENT START */
class MapComponent extends Component {
  state = {
    zoom: 2,
    mapTile: mapTilesUrls.dark,
    countryHover: null
  };

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

    const theme =
      this.props.user && this.props.user.preferences
        ? this.props.user.preferences.theme
        : 'dark';

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
          url={mapTilesUrls[theme]}
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

        {/* Render a layer for each country saved in user's 'countries' array */}
        {this.props.user && this.props.user.countries
          ? this.props.user.countries.map((country, i) => {
              const { country_code, status_code } = country;
              // get geojson shape using helper function in `utils.js`
              const countryShape = getCountryShapeFromCode(country_code);
              // Get the corresponding style from status code from `countryStyles.js`
              const style = countryStatusStyles[status_code];
              // render geojson layer with the correct shape and style
              return <GeoJSON key={i} data={countryShape} style={style} />;
            })
          : null}
      </Map>
    );
  }
}
/* MAIN MAP COMPONENT END */

export default MapComponent;
