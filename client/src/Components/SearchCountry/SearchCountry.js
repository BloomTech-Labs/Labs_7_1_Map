import React, { Component } from 'react';
import Downshift from 'downshift'; // used for the search autocompletion
import PropTypes from 'prop-types';

import geojson from '../Map/countries.geo.json';
import themeColors from '../themeColors.js';
import './SearchCountry.css';

// Source for search autocompletion
const countries = geojson.features;

class SearchCountry extends Component {
  render() {
    return (
      <div className="SearchCountry">
        <Downshift
          onChange={this.props.handleSearchSubmit}
          itemToString={country => (country ? country.properties.name : '')}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            clearSelection
          }) => (
            <div>
              {isOpen ? (
                <div
                  className="downshift-dropdown"
                  style={{
                    border: `1px solid ${
                      themeColors.borderColor[this.props.theme]
                    }`
                  }}
                >
                  {countries
                    .filter(
                      country =>
                        !inputValue ||
                        country.properties.name
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((country, index) => (
                      <div // eslint-disable-line
                        {...getItemProps({
                          key: country.properties.name,
                          className: 'dropdown-item',
                          index,
                          item: country,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? themeColors.fontColor[this.props.theme]
                                : themeColors.background[this.props.theme],
                            color:
                              highlightedIndex === index
                                ? themeColors.background[this.props.theme]
                                : themeColors.fontColor[this.props.theme],
                            fontWeight:
                              selectedItem === country ? 'bold' : 'normal'
                          }
                        })}
                      >
                        {country.properties.name}
                      </div>
                    ))}
                </div>
              ) : null}
              <input
                {...getInputProps({
                  className: 'SearchCountry__input',
                  placeholder: 'Search countries',
                  onFocus: clearSelection,
                  style: {
                    backgroundColor: themeColors.background[this.props.theme],
                    color: themeColors.fontColor[this.props.theme],
                    border: `1px solid ${
                      themeColors.borderColor[this.props.theme]
                    }`
                  }
                })}
              />
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

SearchCountry.propTypes = {
  handleSearchSubmit: PropTypes.func,
  theme: PropTypes.string
};

export default SearchCountry;
