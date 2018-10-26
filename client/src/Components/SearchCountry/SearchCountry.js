import React, { Component } from 'react';
import geojson from '../Map/countries.geo.json';
import world from 'country-data';

// Helper function to get country code from string i.e. 'canada' -> 'CAN'
function getCountryCode(countryString) {
  const countryFeature = geojson.features.find(
    feature =>
      feature.properties.name.toLowerCase() === countryString.toLowerCase()
  );
  if (!countryFeature) console.log('There is no country by that name');
  return countryFeature ? countryFeature.id : null;
}

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
    const countryCode = getCountryCode(e.target.search.value);
    const countryInfo = world.countries[countryCode]
    console.log(countryInfo)
    // this.setState({ searchCountry: searchQuery });
    this.props.updateCurrentCountry(countryInfo.name, countryCode)
  };

  render() {
    return (
      <form className="SearchCountry" onSubmit={this.handleSearchSubmit}>
        <input
          className="MenuItem Center__search"
          type="search"
          name="search"
          value={this.formValue}
          placeholder="Search Countries..."
          onChange={e => this.handleSearchChange(e)}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default SearchCountry;
