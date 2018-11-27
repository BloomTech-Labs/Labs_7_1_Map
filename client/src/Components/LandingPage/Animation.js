import React, { Component } from 'react';
import './Animation.css';
import { ReactComponent as Airplane } from './LandingPageSVG/airplanesvg.svg';
import { ReactComponent as Cloud1 } from './LandingPageSVG/cloud1.svg';
import { ReactComponent as Cloud2 } from './LandingPageSVG/cloud2.svg';
import { ReactComponent as Cloud3 } from './LandingPageSVG/cloud3.svg';
import { ReactComponent as Cloud4 } from './LandingPageSVG/cloud4.svg';
export default class Animation extends Component {
  render() {
    return (
      <div className="airplane_container">
        <Cloud1 className="cloud1"/>
        <Cloud2 className="cloud2"/>
        <Cloud3 className="cloud3"/>
        <Cloud4 className="cloud4"/>
        <Airplane className="airplane_container__svg" />
      </div>
    );
  }
}
