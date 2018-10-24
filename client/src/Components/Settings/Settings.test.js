import React from 'react';
import ReactDOM from 'react-dom';
import { AppContextProvider } from '../../AppContext';
import Settings from './Settings';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppContextProvider>
      <Settings />
    </AppContextProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
