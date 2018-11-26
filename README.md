# MapScratcher

- Live site: https://scratch-n-map.herokuapp.com/

- Wireframes: https://balsamiq.cloud/snv27r3/pdmo5as/rFFE9

## Table of contents

1. [About](#about)
    1. [Features](#features)
    1. [Contributers](#contributers)
1. [Developement](#development)
    1. [Tech Stack](#tech-stack)
    1. [Code Style](#code-style)
    1. [Dependencies](#dependencies)
    1. [Context API](#context-api)
    1. [Deployment](#deployment)
1. [Contributing](#contributing)

<a name="about" /></a>
# About

This project was built by Lambda School students for their capstone project. It is a web version of a 'scratch off world map' game that was popular back in the day where a player would scratch off countries they have visited, lived in, or would like to visit.

<a name="features"></a>
### Features
- Option to create a user account on the app, or to signup/login with Facebook
- 'Scratch card' feature that requires you to scratch off a card to save a country
- Countries are color coded based on status ('Wishlist', 'Visited', 'Lived')
- Save and display personal notes for each country
- Facebook friends that are using the app will show up in each country's 'card'
- View a Facebook friends map.
- Choice of different map tiles and matching UI themes.

<a name="contributers"></a>
### Contributers

Engineering Team:

- Nalee Riddell
- Nikhil Kamineni
- Edward Manda
- David Morales

Project Manager
- Punit Rawal

<a name="development"></a>
# Development

<a name="tech-stack"></a>
## Tech Stack

This app uses the MERN stack, with Leaflet powering the interactive maps.

- MongoDB: We decided to use a NoSQL database as we anticipated our models changing quite a bit as we didn't have as muchtime to plan as would have been ideal. We also didn't anticipate needing lots of models with strict relationships between them.
- React: It was clear that this would be a SPA (single page app) and would have a heavy visual element due to the interactive maps being the focus. React is known for being very fast and well suited to SPA's. This made it a good fit for our front end.
- Node/Express: This was a natural fit with MongoDB and React. Our frontend would be able to easily consume JSON data from our backend without having to do any data conversion. Some very useful and well supported libraries like Mongoose and Passport also made this choice worthwhile.
- Leaflet: While there are some very powerful and featureful map frameworks like Map Box or Google Maps, we decided to use Leaflet as it was completely free and open source. It also seemed to be widely used and well supported. In fact, Leaflet is actually by Map Box so if we wanted to eventually make use of those features it would, theoretically, be a relatively painless transition.


<a name="code-style"></a>
## Code style

- Single quotes
- 2 spaces indentation
- async/await over then/catch
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
- axios
- cors
- dotenv
- express
- helmet
- jsonwebtoken
- mongodb-memory-server
- mongoose
- morgan
- node-gyp
- passport
- passport-facebook
- passport-jwt
- passport-local

Dev Dependencies

- eslint
- eslint-config-prettier
- eslint-plugin-react (client only)
- eslint-plugin-node (server only)
- prettier
- jest
- supertest

<a name="context-api"></a>
## Context API

### AppContext.js usage

The React Context API is used for state management. Global state that multiple components need to access will be defined in `AppContext.js` and consumed by any children component

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
        {value => (
          <div className="App">
            <Signup />
            Here is the data from the global {value.AppState.greet}
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

<a name="contributing"></a>
# Contributing
Contributions are welcome! The instructions below should let you get the app up and running on a development environment.
However, due to the nature of Facebook development it may not be possible for others to make contributions that involve that functionality. If you want to work on features involving that please get in touch.

## Setup
1. Clone this repo
1. Create a .env file inside the root folder (see below for contents)
1. Create a .env files inste the `client` folder (see below for contents)
1. Run `npm install` inside the root folder
1. Run `npm install` inside the `client` folder
1. Run `npm start` inside the root folder
1. Run `npm start` inside the `client` folder

There are separate test suites for the front and back end. To run them simply use the command `npm test` in either the root folder (back end) or the `client` folder (front end).

`/.env`
```
SECRET=<your-secret-here>
PORT=<your-port-here>

FACEBOOK_APP_ID=<facebook-app-id-here>
FACE_APP_SECRET=<facebook-secret-here>
FACEBOOK_APP_CALLBACK_URL=<your-backend-url-here>/api/facebook_login
DEV=on

```

`/client/.env`
```
REACT_APP_DEV=true
REACT_APP_BACKEND_URL=<your-backend-url-here>/api
SKIP_PREFLIGHT_CHECK=true
```
