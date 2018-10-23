import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppContextProvider } from './AppContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppContextProvider>
      <App />
    </AppContextProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
