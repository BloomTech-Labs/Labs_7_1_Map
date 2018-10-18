import React, { Component } from 'react';

const AppContext = React.createContext();

export class AppContextProvider extends Component {
	state = {
		auth: false,
		greet: 'hello',
	};

	render() {
		return <AppContext.Provider value={{ AppState: this.state }}>{this.props.children}</AppContext.Provider>;
	}
}

export const AppContextConsumer = AppContext.Consumer;
