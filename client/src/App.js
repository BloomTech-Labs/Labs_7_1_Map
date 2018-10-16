import React, { Component } from 'react';
import './App.css';
import MapComponent from './Components/Map/Map.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapComponent />
      </div>
    );
  }
}

export default App;
