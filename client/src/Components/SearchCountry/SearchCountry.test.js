import React from 'react';
import ReactDOM from 'react-dom';
import SearchCountry from './SearchCountry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchCountry />, div);
  ReactDOM.unmountComponentAtNode(div);
});
