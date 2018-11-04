import React from 'react';
import { AppContextConsumer } from '../../AppContext';

import Login from './Login';
import Signup from './Signup';

import Logo from '../../logo.png';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <AppContextConsumer>
      {value => (
        <div className="LandingPage">
          <img src={Logo} alt="logo" className="LandingPage__Logo" />

          <div className="LandingPage__Tagline">
            Scratch the Itch to Track Your Trips
          </div>
          {value.AppState.signup ? (
            <Signup
              handleSignUp={value.handleSignUp}
              handleChange={value.handleChange}
              error={value.AppState.user.error}
              signupErrors={value.AppState.signupErrors}
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
        </div>
      )}
    </AppContextConsumer>
  );
};

export default LandingPage;
