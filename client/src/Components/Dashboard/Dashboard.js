import React, { Component } from 'react';
import Map from '../Map/Map';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        Welcome!
        <Map />
      </div>
    );
  }
}

export default Dashboard;
