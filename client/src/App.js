import React, { Component } from 'react';
// will allow our component to access the global state of the app
import { AppContextConsumer } from './AppContext';
import Settings from './Components/Settings/Settings';
import LandingPage from './Components/LandingPage/LandingPage';
import Dashboard from './Components/Dashboard/Dashboard.js';
import Signup from './Components/User/SignUp';
import './App.css';

class App extends Component {
	render() {
		return (
			<AppContextConsumer>
				{(props) => (
					<div className="App">
						<LandingPage />
						<Dashboard />
						<Settings />
					</div>
				)}
			</AppContextConsumer>
		);
	}
}

export default App;
