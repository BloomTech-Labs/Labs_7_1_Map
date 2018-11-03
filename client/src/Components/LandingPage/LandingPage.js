import React from 'react';
import { AppContextConsumer } from '../../AppContext';

import Login from './Login';

import Logo from '../../logo.png';
import './LandingPage.css';

const LandingPage = props => {
  return (
    <div className="LandingPage">
      <AppContextConsumer>
        {() => (
          <React.Fragment>
            <img src={Logo} alt="logo" className="LandingPage__Logo" />

            <div className="LandingPage__Tagline">
              Scratch the Itch to Track Your Trips
            </div>
            <Login />
          </React.Fragment>
        )}
      </AppContextConsumer>
    </div>
  );
};

export default LandingPage;
