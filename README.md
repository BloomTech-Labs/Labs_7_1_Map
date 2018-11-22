# MapScratcher

- Live site: https://scratch-n-map.herokuapp.com/

- Wireframes: https://balsamiq.cloud/snv27r3/pdmo5as/rFFE9

# Table of contents

1. [About](#about)
1. [Features](#features)
1. [Code Style](#code-style)
1. [Dependencies](#dependencies)
1. [Contributers](#contributers)
1. [Context API usage](#context-api)

<a name="about" /></a>
## About

This project was built by Lambda School students for their capstone project. It is a web version of a 'scratch off world map' that were popular back in the day where a player would scratch off countries they have visited, lived in, or would like to visit.

<a name="features"></a>
## Features
- Option to create a user account on the app, or to signup with Facebook
- 'Scratch card' feature that requires you to scratch off a card to save a country
- Countries are color coded based on status ('Wishlist', 'Visited', 'Lived')
- Save and display personal notes for each country
- Facebook friends that are using the app will show up in each country's 'card'
- View a Facebook friends map.


<a name="code-style"></a>
## Code style

- Single quotes
- 2 spaces indentation
- async/await
- Spaces within single-line objects e.g. `obj = { key: 'value' }`

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

<a name="dependencies"></a>
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

<a name="contributers"></a>
## Contributers

Engineering Team:

- Nalee Riddell
- Nikhil Kamineni
- Edward Manda
- David Morales

Project Manager
- Punit Rawal

<a name="context-api"></a>
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

<a name="deployment"></a>
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