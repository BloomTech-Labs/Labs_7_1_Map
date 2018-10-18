# Scratch-N-Map
(Lambda Labs 7.1)

Wireframes: https://balsamiq.cloud/snv27r3/pdmo5as/rFFE9 

## Code style
- Single quotes
- 2 spaces indentation
- async/await
- PropTypes
- Spaces within single-line objects

### Naming conventions:

Front End
```javascript
const AwesomePerson = () => {
  return (
    // 'className' is the same as Component's name
    <div className="AwesomePerson">
      // Nested divs start with 'ParentName__'
      <div className="AwesomePerson__home">
        <div className="home__livingroom ">
          Blah Blah Living room Blah
        </div>
        // Modifiers will have a dash
        <div className="home__kitchen-modifier ">
          Blah Blah kitchen with modifier Blah
        </div>
      </div>
    </div>
  )
}
```


## Dependencies
Front End
- react
- redux
- redux-thunk
- react-router
- react-redux
- prop-types
- axios

Back End
- argon2
- express
- mongoose
- cors
- helmet
- morgan
- axios
- passport
- passport-local
- passport-jwt
- passport-facebook
- jsonwebtoken
- dotenv

Dev Dependencies
- ESLint
- eslint-config-prettier
- eslint-plugin-react (client only)
- eslint-plugin-node (server only)
- Prettier
- Jest

## Contributers
Engineering Team:
- Edward Manda
- David Morales
- Nalee Riddell
- Sneha Thadani
- Nikhil Kamineni

Project Manager
- Punit Rawal

## AppContext.js
The React Context API is initiated here and the provider and consumer are export 
```js  
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
```


## index.js
The Provider is hooked up here
``` js
import React from 'react';
import ReactDOM from 'react-dom';

// bring in our context provider
import { AppContextProvider } from './AppContext';
import App from './App';

import './index.css';

ReactDOM.render(
	<AppContextProvider>
		<App />
	</AppContextProvider>,
	document.getElementById('root')
);
```

## Example of a component using the consumer
The component using a consumer
``` js
import React, { Component } from 'react';
// will allow our component to access the global state of the app
import { AppContextConsumer } from './AppContext';

import './App.css';

class App extends Component {
	render() {
		return (
			<AppContextConsumer>
				{(props) => (
					<div className="App">
						<Signup />
						Here is the data from the global {props.AppState.greet}
					</div>
				)}
			</AppContextConsumer>
		);
	}
}

export default App;
```