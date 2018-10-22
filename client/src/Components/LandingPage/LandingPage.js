import React from 'react';

import { AppContextConsumer } from '../../AppContext';
import LogInBay from './LogInBay';
import Footer from './Footer';

import Logo from '../../logo.png';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <AppContextConsumer>
      {({ updateUserData, AppState }) => (
        <div className="LandingPage">
          <img src={Logo} alt="logo" className="LandingPage__Logo" />
          <h3 className="LandingPage__Tagline">
            Scratch the Itch to Track Your Trips
          </h3>
          {AppState.test}
          <LogInBay
            updateUserData={updateUserData}
            test={AppState.test}
            authenticated={AppState.authenticated}
          />
          <Footer />
        </div>
      )}
    </AppContextConsumer>
  );
};

export default LandingPage;
