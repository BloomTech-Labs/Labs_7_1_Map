import React, { Component } from 'react';
import FuzzySearch from 'react-fuzzy';
import world from 'country-data';
import { getCountryCodeFromName } from '../../utils.js';

const names = [];
getNames(world, 'name');
// document.write('names: ' + names.join(', '));

function getNames(obj, name) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if ('object' === typeof obj[key]) {
        getNames(obj[key], name);
      } else if (key === name) {
        names.push(obj[key]);
      }
    }
  }
}

class SearchCountry extends Component {
  state = {
    // formValue: ''
    name: names
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
          tokenize={true}
          keys={['name']}
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
