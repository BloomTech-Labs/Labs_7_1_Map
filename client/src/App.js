import React from 'react';

import LandingPage from './Components/LandingPage/LandingPage';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LandingPage />
        </header>
      </div>
    );
  }
}

export default App;
