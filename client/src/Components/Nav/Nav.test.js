import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import { AppContextProvider } from '../../AppContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppContextProvider>
      <Nav />
    </AppContextProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
