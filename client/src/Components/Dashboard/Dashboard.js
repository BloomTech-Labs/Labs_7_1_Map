import React, { Component } from 'react';
import Downshift from 'downshift';
import { AppContextConsumer } from '../../AppContext';

import Map from '../Map/Map';
import Nav from '../Nav/Nav';
import CountryPanel from '../CountryPanel/CountryPanel';
import Legend from '../Legend/Legend';
import Settings from '../Settings/Settings';
import SearchCountry from '../SearchCountry/SearchCountry';
import geojson from '../Map/countries.geo.json';

import './Dashboard.css';

const books = [
  { name: 'Harry Potter' },
  { name: 'Net Moves' },
  { name: 'Half of a yellow sun' },
  { name: 'The Da Vinci Code' },
  { name: 'Born a crime' }
];

const countries = geojson.features;

const onChange = country => {
  alert(`you selected ${country.properties.name}`);
};

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
                {/* <SearchCountry */}
                {/*   updateCurrentCountry={value.updateCurrentCountry} */}
                {/*   handleSearchSubmit={value.handleSearchSubmit} */}
                {/*   theme={theme} */}
                {/* /> */}
                <div className="SearchCountry">
                  <Downshift
                    onChange={onChange}
                    itemToString={country =>
                      country ? country.properties.name : ''
                    }
                  >
                    {({
                      getInputProps,
                      getItemProps,
                      isOpen,
                      inputValue,
                      highlightedIndex,
                      selectedItem,
                      highlightedItem,
                      getLabelProps
                    }) => (
                      <div>
                        <label
                          style={{ marginTop: '1rem', display: 'block' }}
                          {...getLabelProps()}
                        >
                          Search for a country
                        </label>{' '}
                        <br />
                        <input
                          {...getInputProps({
                            placeholder: 'Search countries'
                          })}
                        />
                        {isOpen ? (
                          <div className="downshift-dropdown">
                            {countries
                              .filter(
                                country =>
                                  !inputValue ||
                                  country.properties.name
                                    .toLowerCase()
                                    .includes(inputValue.toLowerCase())
                              )
                              .map((country, index) => (
                                <div
                                  key={index}
                                  className="dropdown-item"
                                  {...getItemProps({
                                    key: country.properties.name,
                                    index,
                                    item: country
                                  })}
                                  style={{
                                    backgroundColor:
                                      highlightedIndex === index
                                        ? 'lightgray'
                                        : 'white',
                                    fontWeight:
                                      selectedItem === country
                                        ? 'bold'
                                        : 'normal'
                                  }}
                                >
                                  {country.properties.name}
                                </div>
                              ))}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </Downshift>
                </div>
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
