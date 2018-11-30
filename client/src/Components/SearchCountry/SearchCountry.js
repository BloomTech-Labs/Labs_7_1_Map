import React, { Component } from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';

import geojson from '../Map/countries.geo.json';
import themeColors from '../themeColors.js';
import './SearchCountry.css';

const countries = geojson.features;

const onChange = country => {
  alert(`you selected ${country.properties.name} - ${country.id}`);
};

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
      <div className="SearchCountry">
        <Downshift
          onChange={onChange}
          itemToString={country => (country ? country.properties.name : '')}
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
              {/* <label */}
              {/*   style={{ marginTop: '1rem', display: 'block' }} */}
              {/*   {...getLabelProps()} */}
              {/* > */}
              {/*   Search for a country */}
              {/* </label>{' '} */}
              {/* <br /> */}
              <input
                {...getInputProps({
                  placeholder: 'Search countries'
                })}
                style={{
                  backgroundColor: themeColors.background[this.props.theme],
                  color: themeColors.fontColor[this.props.theme],
                  border: `1px solid ${
                    themeColors.borderColor[this.props.theme]
                  }`
                }}
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
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight:
                            selectedItem === country ? 'bold' : 'normal'
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
        {/* <form */}
        {/*   className="SearchCountry" */}
        {/*   onSubmit={this.props.handleSearchSubmit} */}
        {/* > */}
        {/*   <input */}
        {/*     className="SearchCountry__input" */}
        {/*     type="text" */}
        {/*     name="search" */}
        {/*     value={this.formValue} */}
        {/*     placeholder="Search Countries..." */}
        {/*     onChange={e => this.handleSearchChange(e)} */}
        {/*     style={{ */}
        {/*       backgroundColor: themeColors.background[this.props.theme], */}
        {/*       color: themeColors.fontColor[this.props.theme], */}
        {/*       border: `1px solid ${themeColors.borderColor[this.props.theme]}` */}
        {/*     }} */}
        {/*   /> */}
        {/* </form> */}
      </div>
    );
  }
}

SearchCountry.propTypes = {
  updateCurrentCountry: PropTypes.func,
  handleSearchSubmit: PropTypes.func,
  theme: PropTypes.string
};

export default SearchCountry;
