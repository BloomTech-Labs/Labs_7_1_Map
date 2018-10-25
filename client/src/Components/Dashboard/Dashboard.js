import React, { Component } from 'react';
import { AppContextConsumer } from '../../AppContext';

import Map from '../Map/Map';
import Nav from '../Nav/Nav';
import Legend from '../Legend/Legend';
import Settings from '../Settings/Settings';
import GeoLocation from '../GeoLocation/GeoLocation';

import './Dashboard.css';

class Dashboard extends Component {
  state = {
    showingSettings: false
  };

  toggleSettings = () => {
    this.setState({ showingSettings: !this.state.showingSettings });
  };

  render() {
    return (
      <div className="Dashboard">
        <Nav toggleSettings={this.toggleSettings} />
        <Legend />
        <Map />
        {this.state.showingSettings && (
          <Settings onClick={this.toggleSettings} />
        )}

        <AppContextConsumer>
        {value => {
          return <GeoLocation update={value.updateUserPosition} />;
        }}
      </AppContextConsumer>
      </div>
    );
  }
}

export default Dashboard;
