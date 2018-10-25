import React, { Component } from 'react';

class SearchCountry extends Component {
  state = {
    formValue: ''
  }

  handleSearchChange = async e => {
    e.preventDefault();
    console.log('handleSearchChange event: ', e.target.value);
    await this.setState({ formValue: e.target.value });
    console.log('SearchCountry state: ', this.state);
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
