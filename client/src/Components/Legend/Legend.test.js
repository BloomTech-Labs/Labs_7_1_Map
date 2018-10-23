import React from 'react';
import ReactDOM from 'react-dom';
import Legend from './Legend';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Legend />, div);
  ReactDOM.unmountComponentAtNode(div);
});
