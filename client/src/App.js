import React, { Component } from 'react';
import './App.css';
import Settings from './Components/Settings/Settings';
import Dashboard from './Components/Dashboard/Dashboard.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
        <Settings />
      </div>
    );
  }
}

export default App;
