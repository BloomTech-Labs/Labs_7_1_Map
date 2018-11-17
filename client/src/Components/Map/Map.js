import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import wc from 'which-country';

import { AppContextConsumer } from '../../AppContext';
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
import { mapTilesUrls, markerIcon, bounds } from './mapSetup.js';

import './Map.css';

class MapComponent extends Component {
  state = {
    zoom: 3,
    mapTile: mapTilesUrls.standard,
    countryHover: null
  };

  handleClick = async e => {
    // Get the country code of the location clicked on
    const countryCode = await wc([e.latlng.lng, e.latlng.lat]);

    const countryInfo = getCountryInfoFromCode(countryCode);

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

  // Maintains zoom level
  handleZoomend = e => {
    const newZoomLevel = e.target._zoom;
    this.setState({ zoom: newZoomLevel });
  };

  render() {
    const position = this.props.userPosition
      ? [this.props.userPosition.lat, this.props.userPosition.lng]
      : [0, 20]; // Arbitrary value, can be changed to something else

    const theme =
      this.props.user && this.props.user.preferences
        ? this.props.user.preferences.theme
        : 'standard';

    return (
      <AppContextConsumer>
        {value => (
          <Map
            center={position}
            zoom={this.state.zoom}
            className="MapComponent"
            minZoom={2}
            // maxZoom={12}
            maxBounds={bounds}
            onClick={this.handleClick}
            onMouseMove={this.handleMove}
            onZoomend={this.handleZoomend}
            zoomControl={false}
          >
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url={mapTilesUrls[theme]}
            />

            {/* Layers that will be active when a country is CLICKED */}
            {/* Produces a layer for each country in the geojson file */}
            {value.AppState.currentCountry &&
              !value.AppState.friendBeingViewed &&
              geojson.features.map(
                feature =>
                  // Layer is only rendered if the clicked on country ID is the same
                  value.AppState.currentCountry.code === feature.id && (
                    <GeoJSON
                      key={feature.id}
                      data={getCountryShapeFromCode(feature.id)}
                      style={styleSelected}
                    />
                  )
              )}

            {/* Layers that will be active when a country is HOVERED */}
            {/* Produces a layer for each country in the geojson file */}
            {!value.AppState.friendBeingViewed &&
              geojson.features.map(
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
            {value.AppState.user &&
            value.AppState.user.countries &&
            !value.AppState.friendBeingViewed
              ? value.AppState.user.countries.map((country, i) => {
                  const { country_code, status_code } = country;
                  // get geojson shape using helper function in `utils.js`
                  const countryShape = getCountryShapeFromCode(country_code);
                  // Get the corresponding style from status code from `countryStyles.js`
                  const style = countryStatusStyles[status_code];
                  // render geojson layer with the correct shape and style
                  return <GeoJSON key={i} data={countryShape} style={style} />;
                })
              : null}

            {/* Render a layer for each country in `friendBeingViewed` */}
            {value.AppState.friendBeingViewed &&
              value.AppState.friendBeingViewed.map((country, i) => {
                const { country_code, status_code } = country;
                // get geojson shape using helper function in `utils.js`
                const countryShape = getCountryShapeFromCode(country_code);
                // Get the corresponding style from status code from `countryStyles.js`
                const style = countryStatusStyles[status_code];
                // render geojson layer with the correct shape and style
                return <GeoJSON key={i} data={countryShape} style={style} />;
              })}

              { /* Render a pin at the users coordinates, if available */ }
            {value.AppState.userPosition &&
              !value.AppState.friendBeingViewed && (
                <Marker
                  position={position}
                  icon={markerIcon}
                  opacity={0.8}
                  className="userPosition"
                />
              )}
          </Map>
        )}
      </AppContextConsumer>
    );
  }
} // MapComponent

MapComponent.propTypes = {
  updateCurrentCountry: PropTypes.func,
  userPosition: PropTypes.object,
  user: PropTypes.object
};

export default MapComponent;
