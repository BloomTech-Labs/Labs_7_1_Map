import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';

// will allow our component to access the global state of the app
import { AppContextConsumer } from './AppContext';
// import Settings from './Components/Settings/Settings';
import LandingPage from './Components/LandingPage/LandingPage';
import Dashboard from './Components/Dashboard/Dashboard.js';
// import SignUp from './Components/User/SignUp';
// import SignIn from './Components/User/SignIn';

import './App.css';

class App extends Component {
  render() {
    return (
      <AppContextConsumer>
        {props => (
          <div className="App">
            {props.AppState.authenticated ? <Dashboard /> : <LandingPage />}
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

export default App;
