import React from 'react';
import FacebookLogin from 'react-facebook-login';

import { AppContextConsumer } from '../../AppContext';

import Login from './Login';
import Signup from './Signup';

import Logo from '../../logo.png';
import './LandingPage.css';

// load the credentials
const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.REACT_APP_FACEBOOK_APP_SECRET;
const FACEBOOK_APP_CALLBACK_URL_URL =
  process.env.REACT_APP_FACEBOOK_APP_CALLBACK_URL;

console.log(FACEBOOK_APP_ID);
console.log(FACEBOOK_APP_SECRET);
console.log(FACEBOOK_APP_CALLBACK_URL_URL);

const componentClicked = () => {
  console.log('Hello');
};
const responseFacebook = response => {
  console.log(response);
};
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
          <div className="Divider">
            <div className="Left" />
            <div className="Middle">OR</div>
            <div className="Right" />
          </div>
          <FacebookLogin
            appId="1088597931155576"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
          />
        </div>
      )}
    </AppContextConsumer>
  );
};

export default LandingPage;
