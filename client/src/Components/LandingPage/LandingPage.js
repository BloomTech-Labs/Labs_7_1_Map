import React from 'react';

import LogInBay from './LogInBay';
import Footer from '../Footer/Footer';

import Logo from '../../logo.png';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <img src={Logo} alt="logo" className="LandingPage__Logo" />

      <h3 className="LandingPage__Tagline">
        Scratch the Itch to Track Your Trips
      </h3>
      <LogInBay />
      <Footer />
    </div>
  );
};

export default LandingPage;
