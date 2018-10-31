import React, { Component } from 'react';
import FuzzySearch from 'react-fuzzy';
import world from 'country-data';
import { getCountryCodeFromName } from '../../utils.js';

class SearchCountry extends Component {
  state = {
    // formValue: ''
    name: ''
  };

  // handleSearchChange = e => {
  //   e.preventDefault();
  //   this.setState({ formValue: e.target.value });
  // };

  handleSubmit = e => {
    e.preventDefault();
    const countryCode = getCountryCodeFromName(e.target.search.value);
    const countryInfo = world.countries[countryCode];
    this.props.updateCurrentCountry(countryCode, countryInfo);
  };

  render() {
    return (
      <form className="SearchCountry">
        <FuzzySearch
          className="MenuItem Center__search"
          list={this.state.name}
          width={200}
          verbose={true}
          onSelect={this.handleSubmit}
          // keys={['name']}
          // tokenize={true}
        />
        {/* <input
          className="MenuItem Center__search"
          type="search"
          name="search"
          value={this.formValue}
          placeholder="Search Countries..."
          onChange={e => this.handleSearchChange(e)}
        /> */}
        {/* <input type="submit" /> */}
      </form>
    );
  }
}

export default SearchCountry;
