import React from 'react';

import './LogInBay.css';

class LogInBay extends React.Component {
  state = {};

  render() {
    return (
      <div className="LogInBay">
        <button type="button" className="LogInBay-LogIn" onClick="">
          Log In
        </button>
        <button className="LogInBay-SignUp">Sign Up</button>
      </div>
    );
  }
}

export default LogInBay;
