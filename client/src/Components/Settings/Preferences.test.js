import React from 'react';
import ReactDOM from 'react-dom';
import Preferences from './Preferences';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Preferences />, div);
  ReactDOM.unmountComponentAtNode(div);
});
