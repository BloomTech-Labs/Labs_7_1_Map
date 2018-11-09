import React, { Component } from 'react';
import { AppContextConsumer } from '../../AppContext';

import Map from '../Map/Map';
import Nav from '../Nav/Nav';
import CountryPanel from '../CountryPanel/CountryPanel';
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
        <AppContextConsumer>
          {value => {
            const currentTheme =
              value && value.AppState.user.preferences
                ? value.AppState.user.preferences.theme
                : 'standard';
            return (
              <React.Fragment>
                <Nav toggleSettings={value.toggleSettings} />
                <CountryPanel />
                <Legend />
                <SearchCountry
                  updateCurrentCountry={value.updateCurrentCountry}
                  handleSearchSubmit={this.handleSearchSubmit}
                  theme={currentTheme}
                />
                <Map
                  userPosition={value.AppState.userPosition}
                  updateUserPosition={value.updateUserPosition}
                  searchCountry={this.state.searchCountry}
                  updateCurrentCountry={value.updateCurrentCountry}
                  currentCountry={value.AppState.currentCountry}
                  user={value.AppState.user}
                  scratched={value.AppState.scratched}
                />
                <Settings showingSettings={value.AppState.showingSettings} />
              </React.Fragment>
            );
          }}
        </AppContextConsumer>
      </div>
    );
  }
}

export default Dashboard;
