import React from 'react';
import ReactDOM from 'react-dom';
import ChangeEmail from './ChangeEmail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChangeEmail />, div);
  ReactDOM.unmountComponentAtNode(div);
});
