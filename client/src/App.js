import React, { Component } from 'react';

// will allow our component to access the global state of the app
import { AppContextConsumer } from './AppContext';
import LandingPage from './Components/LandingPage/LandingPage';
import Dashboard from './Components/Dashboard/Dashboard.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <AppContextConsumer>
        {value => (
          <div className="App">
            {value.AppState.authenticated ? <Dashboard /> : <Dashboard />}
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

export default App;
