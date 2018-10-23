import React, { Component } from 'react';
import Map from '../Map/Map';
import Nav from '../Nav/Nav';
import Legend from '../Legend/Legend';
import Settings from '../Settings/Settings';

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
      </div>
    );
  }
}

export default Dashboard;
