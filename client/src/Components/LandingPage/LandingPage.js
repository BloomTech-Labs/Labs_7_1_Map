import React from 'react';

import { AppContextConsumer } from '../../AppContext';

import LogInBay from './LogInBay';
import Animation from './Animation';
import FailedLoginPopUp from './FailedLoginPopUp';
import Footer from '../Footer/Footer';

import './LandingPage.css';

const LandingPage = props => {
  let PopUp;
  if (props.failedLogin === true) {
    PopUp = <FailedLoginPopUp />;
  } else {
    PopUp = <div> </div>;
  }
  return (
    <div className="LandingPage">
      {/* <img src={Logo} alt="logo" className="LandingPage__Logo" /> */}
      <div className="LandingPage__Container">
        <div className="Container__Header">
          <h1 className="Header__Title">MapScratcher</h1>
        </div>
        <div className="Container__Content">
          <div className="Content__Left">
            <h3 className="Left__Tagline">
              <div className="Tagline__Phrase">
                <p>Track where you've been.</p>
                <p>Plan where you'll go.</p>
              </div>
            </h3>
            <div className="Left__LoginBayContainer">
              <AppContextConsumer>
                {value => {
                  return (
                    <LogInBay
                      className="LoginBayContainer__LoginBay"
                      failedSignUp={value.AppState.failedSignUp}
                      handleSignUp={value.handleSignUp}
                      failedSignUpMessage={value.AppState.failedSignUpMessage}
                      resetAppStateError={value.resetAppStateError}
                    />
                  );
                }}
              </AppContextConsumer>
              {PopUp}
            </div>
          </div>
          <div className="Content__Right">
            <div className="Right__Animation">
              <Animation />
            </div>
          </div>
        </div>
        <div className="Container__Footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;