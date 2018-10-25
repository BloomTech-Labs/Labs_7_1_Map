import React, { Component } from 'react';
import geolocation from 'geolocation';

export default class GeoLocation extends Component {
  state = {
      longitude: '',
      latitude: ''
  };

  //checks if browser has ability to geolocate
  componentDidMount = () => {
    if ('geolocation' in navigator) {
      this.hasGeolocation();
    } else {
      this.noGeolocation();
    }
  };

  //calls getcurrentposition, to find where user is located, sets state
  hasGeolocation = () => {
    console.log('has geolocation!');
    navigator.geolocation.getCurrentPosition( position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  };

  noGeolocation = () => {
    console.log('no geolocation!');
  };

  render() {
    return <div />;
  }
}
