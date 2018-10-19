import React from 'react';

import Splash from './Splash';
import LogInBay from './LogInBay';

import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="Landing-Page">
      <Splash />
      <LogInBay />
    </div>
  );
};

export default LandingPage;
