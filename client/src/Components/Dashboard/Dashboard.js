import React, { Component } from 'react';
import Map from '../Map/Map';
import Nav from '../Nav/Nav';
import Legend from '../Legend/Legend';
import Settings from '../Settings/Settings';

import './Dashboard.css';

class Dashboard extends Component {
  state = {
    showingSettings: false,
    searchCountry: ''
  };

  toggleSettings = () => {
    this.setState({ showingSettings: !this.state.showingSettings });
  };

  handleSearchSubmit = async e => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    await this.setState({ searchCountry: searchQuery });
    console.log(this.state);
  };

  render() {
    return (
      <div className="Dashboard">
        <Nav toggleSettings={this.toggleSettings} />
        <Legend />
        <form className="SearchCountry" onSubmit={this.handleSearchSubmit}>
          <input
            className="MenuItem Center__search"
            type="search"
            name="search"
            placeholder="Search Countries..."
          />
          <input type="submit" />
        </form>
        <Map />
        {this.state.showingSettings && (
          <Settings onClick={this.toggleSettings} />
        )}
      </div>
    );
  }
}

export default Dashboard;
