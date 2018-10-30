import React from 'react';
import ReactDOM from 'react-dom';
import CountryPanel from './CountryPanel';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CountryPanel />, div);
  ReactDOM.unmountComponentAtNode(div);
});
