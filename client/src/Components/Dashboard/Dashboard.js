import React, { Component } from 'react';
import Map from '../Map/Map';
import Nav from '../Nav/Nav';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <Nav />
        <Map />
      </div>
    );
  }
}

export default Dashboard;
