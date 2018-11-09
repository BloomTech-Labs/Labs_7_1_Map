import React, { Component } from 'react';
import world from 'country-data';
import { getCountryCodeFromName } from '../../utils.js';

import './SearchCountry.css';
import themeColors from '../themeColors.js';

class SearchCountry extends Component {
  state = {
    formValue: ''
  };

  handleSearchChange = e => {
    e.preventDefault();
    this.setState({ formValue: e.target.value });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    const countryCode = getCountryCodeFromName(e.target.search.value);
    const countryInfo = world.countries[countryCode];
    this.props.updateCurrentCountry(countryCode, countryInfo);
  };

  render() {
    return (
      <form className="SearchCountry" onSubmit={this.handleSearchSubmit}>
        <input
          className="SearchCountry__input"
          type="search"
          name="search"
          value={this.formValue}
          placeholder="Search Countries..."
          onChange={e => this.handleSearchChange(e)}
          style={{
            backgroundColor: themeColors.background[this.props.theme],
            color: themeColors.color[this.props.theme]
          }}
        />
      </form>
    );
  }
}

export default SearchCountry;
