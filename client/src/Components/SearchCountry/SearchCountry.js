import React, { Component } from 'react';
import PropTypes from 'prop-types';

import themeColors from '../themeColors.js';
import './SearchCountry.css';

class SearchCountry extends Component {
  state = {
    formValue: ''
  };

  handleSearchChange = e => {
    e.preventDefault();
    this.setState({ formValue: e.target.value });
  };

  render() {
    return (
      <form className="SearchCountry" onSubmit={this.props.handleSearchSubmit}>
        <input
          className="SearchCountry__input"
          type="text"
          name="search"
          value={this.formValue}
          placeholder="Search Countries..."
          onChange={e => this.handleSearchChange(e)}
          style={{
            backgroundColor: themeColors.background[this.props.theme],
            color: themeColors.fontColor[this.props.theme],
            border: `1px solid ${themeColors.borderColor[this.props.theme]}`
          }}
        />
      </form>
    );
  }
}

SearchCountry.propTypes = {
  updateCurrentCountry: PropTypes.func,
  handleSearchSubmit: PropTypes.func,
  theme: PropTypes.string
};

export default SearchCountry;
