import React, { Component } from 'react';
import geolocation from 'geolocation';

export default class GeoLocation extends Component {

  //checks if browser has ability to geolocate
  componentDidMount = () => {
    if ('geolocation' in navigator) {
      this.hasGeolocation(this.providerUpdate);
    } else {
      this.noGeolocation();
    }
  };

  //calls getcurrentposition, to find where user is located, sets state
  hasGeolocation = (cb) => {
    console.log('has geolocation!');
    navigator.geolocation.getCurrentPosition( position => {
    cb(position.coords.longitude, position.coords.latitude)
    });
  };

  noGeolocation = () => {
    console.log('no geolocation!');
  };

  providerUpdate = (long, lat) => {
      this.props.update(long, lat);
  }

  render() {
    return <div />;
  }
}
