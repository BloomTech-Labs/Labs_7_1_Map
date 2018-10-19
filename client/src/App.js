import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// will allow our component to access the global state of the app
import { AppContextConsumer } from './AppContext';
import Settings from './Components/Settings/Settings';
import LandingPage from './Components/LandingPage/LandingPage';
import Dashboard from './Components/Dashboard/Dashboard.js';
import SignUp from './Components/User/SignUp';
import SignIn from './Components/User/SignIn';

import './App.css';

class App extends Component {
  render() {
    return (
      <AppContextConsumer>
        {() => (
          <div className="App">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

export default withRouter(App);
