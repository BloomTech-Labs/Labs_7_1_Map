import React, { Component } from 'react';

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
