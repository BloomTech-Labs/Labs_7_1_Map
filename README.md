# Scratch-N-Map

(Lambda Labs 7.1)
 - Live site: https://scratch-n-map.herokuapp.com/ 

- Wireframes: https://balsamiq.cloud/snv27r3/pdmo5as/rFFE9

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
        <div className="home__livingroom ">Blah Blah Living room Blah</div>
        // Modifiers will have a dash
        <div className="home__kitchen-modifier ">
          Blah Blah kitchen with modifier Blah
        </div>
      </div>
    </div>
  );
};
```

## Dependencies

Front End
- react
- leaflet
- react-leaflet
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
- Nikhil Kamineni

Project Manager

- Punit Rawal

## Context API Usage
### AppContext.js usage

The React Context API is initiated here and the provider and consumer are export

```js
import React, { Component } from 'react';

const AppContext = React.createContext();

export class AppContextProvider extends Component {
  state = {
    auth: false,
    greet: 'hello'
  };

  render() {
    return (
      <AppContext.Provider value={{ AppState: this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
```

### index.js
The Provider is hooked up here

```js
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

### Example of a component using the consumer 
The component using a consumer

```js
import React, { Component } from 'react';
// will allow our component to access the global state of the app
import { AppContextConsumer } from './AppContext';

import './App.css';

class App extends Component {
  render() {
    return (
      <AppContextConsumer>
        {props => (
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

## Deployment
Front and back end is deployed on Heroku. Deploying is as simple as running `git push heroku master`, assuming you are logged in with the right credentials.

Steps:
1. Login to Heroku with the command `heroku login` while in the project folder. You should then be prompted to enter the login credentials.

1. Make sure you have the master branch checked out (`git checkout master`)

1. Make sure the master branch is up-to-date by running `git pull` and ensure the branch runs fine locally and passes all tests

1. Deploy the master branch by running `git push heroku master`

1. If you need to deploy a branch other than the master, you can do so with the command `git push heroku <branch-name>:master`. 
E.g. if you want to deploy a branch named 'deployment' to heroku:
  ```shell
  $ git push heroku deployment:master
  ```
