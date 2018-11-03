import React from 'react';
import { AppContextConsumer } from '../../AppContext';

import Login from './Login';
import Signup from './Signup';

import Logo from '../../logo.png';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <AppContextConsumer>
        {value => (
          <React.Fragment>
            <img src={Logo} alt="logo" className="LandingPage__Logo" />

            <div className="LandingPage__Tagline">
              Scratch the Itch to Track Your Trips
            </div>
            {value.AppState.signup ? (
              <Signup
                handleSignUp={value.handleSignIn}
                handleChange={value.handleChange}
                error={value.AppState.user.error}
                hideSignUp={value.hideSignUp}
              />
            ) : (
              <Login
                handleSignIn={value.handleSignIn}
                handleChange={value.handleChange}
                error={value.AppState.user.error}
                displaySignUp={value.displaySignUp}
              />
            )}
          </React.Fragment>
        )}
      </AppContextConsumer>
    </div>
  );
};

export default LandingPage;
