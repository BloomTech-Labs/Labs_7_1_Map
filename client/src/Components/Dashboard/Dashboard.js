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
    showingSettings: false
  };

  toggleSettings = () => {
    this.setState({ showingSettings: !this.state.showingSettings });
  };

  render() {
    return (
      <div className="Dashboard">
        <AppContextConsumer>
          {value => {
            const theme =
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
                  handleSearchSubmit={value.handleSearchSubmit}
                  theme={theme}
                />
                <Map
                  userPosition={value.AppState.userPosition}
                  user={value.AppState.user}
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
