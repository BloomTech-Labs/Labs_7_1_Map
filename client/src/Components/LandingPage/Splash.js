import React from 'react';
import Logo from '../../Scratch N Map.png';

import './Splash.css';

const Splash = () => {
  return (
    <div className="Splash">
      <img src={Logo} alt="logo" className="Splash-Logo"/>
      <h4 className="Splash-Tagline">Scratch the Itch to Track Your Trips</h4>
    </div>
  );
};

export default Splash;
