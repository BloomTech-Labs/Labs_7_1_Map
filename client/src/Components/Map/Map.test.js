import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import { AppContextProvider } from '../../AppContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppContextProvider>
      <Map />
    </AppContextProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
