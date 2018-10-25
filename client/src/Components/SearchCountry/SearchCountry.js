import React from 'react';

const SearchCountry = props => {
  return (
    <form className="SearchCountry" onSubmit={props.handleSearchSubmit}>
      <input
        className="MenuItem Center__search"
        type="search"
        name="search"
        placeholder="Search Countries..."
      />
      <input type="submit" />
    </form>
  );
};

export default SearchCountry;
