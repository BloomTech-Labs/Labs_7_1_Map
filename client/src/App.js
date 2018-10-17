import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Settings from './Components/Settings/Settings';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Settings />
        </div>
    );
  }
}

export default App;
