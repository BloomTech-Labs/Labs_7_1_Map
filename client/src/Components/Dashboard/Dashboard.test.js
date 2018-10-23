import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import { AppContextProvider } from '../../AppContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppContextProvider>
      <Dashboard />
    </AppContextProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
