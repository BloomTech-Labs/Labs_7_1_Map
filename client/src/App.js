import React, { Component } from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import Dashboard from './Components/Dashboard/Dashboard.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingPage />
        <Dashboard />
      </div>
    );
  }
}

export default App;
