import React, { Component } from 'react';
import { AppContextConsumer } from '../../AppContext';

import Map from '../Map/Map';
import Nav from '../Nav/Nav';
import Legend from '../Legend/Legend';
import Settings from '../Settings/Settings';
import SearchCountry from '../SearchCountry/SearchCountry';

import './Dashboard.css';

class Dashboard extends Component {
  state = {
    showingSettings: false,
    searchCountry: ''
  };

  toggleSettings = () => {
    this.setState({ showingSettings: !this.state.showingSettings });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    this.setState({ searchCountry: searchQuery });
  };

  render() {
    return (
      <div className="Dashboard">
        <Nav toggleSettings={this.toggleSettings} />
        <Legend />
        <AppContextConsumer>
          {value => (
            <SearchCountry
              updateCurrentCountry={value.updateCurrentCountry}
              handleSearchSubmit={this.handleSearchSubmit}
            />
          )}
        </AppContextConsumer>
        <AppContextConsumer>
          {value => {
            return (
              <Map
                userPosition={value.AppState.userPosition}
                updateUserPosition={value.updateUserPosition}
                searchCountry={this.state.searchCountry}
                updateCurrentCountry={value.updateCurrentCountry}
                currentCountry={value.AppState.currentCountry}
              />
            );
          }}
        </AppContextConsumer>

        <Settings
          onClick={this.toggleSettings}
          showingSettings={this.state.showingSettings}
        />
      </div>
    );
  }
}

export default Dashboard;
