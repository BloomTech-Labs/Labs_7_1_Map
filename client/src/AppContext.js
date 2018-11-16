import React, { Component } from 'react';
import axios from 'axios';
import world from 'country-data';
import {
  clearLocalstorage,
  getCountryShapeFromCode,
  getCountryCodeFromName
} from './utils.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// new context
const AppContext = React.createContext();

// provider component
export class AppContextProvider extends Component {
  state = {
    authenticated: false,
    currentCountry: {
      code: '',
      info: {},
      geoInfo: {},
      scratched: false,
      notes: '',
      editNoteMode: false
    },
    currentCountryStatus: null,
    failedLogin: false,
    failedSignUp: false,
    failedSignUpMessage: '',
    friends: [],
    friendBeingViewed: null,
    searchCountry: '',
    showingSettings: false,
    showingCountryPanel: false,
    user: {},
    userPosition: { lat: 22.28552, lng: 114.15769 }
  };

  async componentDidMount() {
    // Check if a JWT is added as a query string in URL from the Facebook redirect.
    // If it exists, store the token in localStorage and redirect to main page.
    // The user will then be automatically logged in and taken to their dashboard.
    // TODO: Look into how secure the current implementation is and come up with a new one if warranted.
    //       May need to refactor auth system to use cookies.
    if (window.location.search) {
      localStorage.setItem('token', window.location.search.slice(7));
      window.location = '/';
    }

    // Check if a JWT token exists in localStorage
    try {
      // Retrieve token and user stored in local storage
      const token = localStorage.getItem('token');

      if (token) {
        const requestOptions = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Get the user info from DB
        const response = await axios.get(
          `${BACKEND_URL}/get_user`,
          requestOptions
        );

        // Update state if the user was retrieved from the DB
        if (response.status === 200)
          await this.setState({
            authenticated: true,
            user: { ...response.data }
          });
      }

      // Get a users facebook friends if they signed up with facebook
      // TODO: Move this over to the backend so this is only called upon login
      if (this.state.user.facebook) {
        const { id, accessToken } = this.state.user.facebook;
        const facebookResponse = await axios.get(
          `https://graph.facebook.com/${id}/friends?access_token=${accessToken}`
        );
        await this.setState({ friends: facebookResponse.data.data });
      }
    } catch (e) {
      // failed async
      clearLocalstorage(); // error encountered
    }

    // Ask for user location if browser is compatible
    if ('geolocation' in navigator) {
      this.hasGeolocation();
    }
    // Attempt to get location based on IP if geolocation is not supported
    else {
      this.getLocationUsingIP();
    }
  } // componentDidMount

  // Close CountryPanel
  closeCountryPanel = () => {
    this.setState({
      showingCountryPanel: false
    });
  }; // closeCountryPanel

  // Get the notes of a country saved on user
  getCurrentCountryNotes = code => {
    let notes = '';
    const userCountries = [...this.state.user.countries];

    if (userCountries) {
      const findCountry = userCountries.find(
        country => code === country.country_code
      );

      notes = findCountry ? findCountry.notes : '';
    }
    return notes;
  }; // getCurrentCountryNotes

  getLocationUsingIP = () => {
    axios
      .get('https://ipapi.co/json')
      .then(response => {
        this.updateUserPosition(
          response.data.latitude,
          response.data.longitude
        );
      })
      .catch(err => {
        // error
        console.log(err);
      });
  };

  handleChangeNote = e => {
    console.log(e.target.name, e.target.value);
    const currentCountry = { ...this.state.currentCountry };
    currentCountry[e.target.name] = e.target.value;
    this.setState({ currentCountry });
  };

  handleScratched = async () => {
    try {
      const { currentCountry } = this.state;

      const body = {
        country_code: currentCountry.code,
        name: currentCountry.info.name,
        scratched: true
        // notes: currentCountry.notes
      };

      const options = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const response = await axios.post(
        `${BACKEND_URL}/country_scratched`,
        body,
        options
      );

      currentCountry.scratched = true;
      this.setState({
        currentCountry,
        currentCountryStatus: 0,
        user: response.data
      });
    } catch (err) {
      console.error('Error updating scratched for country!');
    }
  };

  handleSignIn = async e => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, body);
      localStorage.setItem('token', response.data.jwt_token);
      this.setState({
        authenticated: true,
        user: { ...response.data.user }
      });
    } catch (e) {
      // failed async
      this.setState({ failedLogin: true });
    }
  }; // handleSignIn

  handleSignOut = () => {
    this.setState({ authenticated: false, user: {} });
    clearLocalstorage();
  }; // handleSignOut

  handleSignUp = async e => {
    e.preventDefault();

    // TODO: Error handling
    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value
    };

    const response = await axios.post(`${BACKEND_URL}/register`, body);
    localStorage.setItem('token', response.data.jwt_token);
    this.setState({
      authenticated: true,
      user: response.data.user
    });
  }; // handleSignUp

  // Called in BorderBay.js
  handleSliderMove = async value => {
    try {
      const { currentCountry } = this.state;

      const body = {
        country_code: currentCountry.code,
        name: currentCountry.info.name,
        status_code: value
      };
      const options = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const response = await axios.post(
        `${BACKEND_URL}/country_status`,
        body,
        options
      );

      // Clear the countries array on state first (whilst keeping the rest of the user data)
      // This is needed so React re-renders an existing country's updated status color
      // It is a workaround for the following issue:
      //    - Updating an existing country would not update the color
      //    - This is because React does not detect changes in nested objects
      //    - Clearing the countries array first will cause the geojson layer to re-render
      // TODO: Refactor to store users' countries as an array on AppState (not inside user)
      const currentUserInfo = this.state.user;
      currentUserInfo.countries = [];
      this.setState({ user: currentUserInfo });

      // Update user data on state with new data from back end
      this.setState({ user: response.data });
      this.updateCurrentCountryStatus();
    } catch (err) {
      console.error('Error updating country status!');
    }
  }; // handleSliderMove

  handleSearchSubmit = e => {
    e.preventDefault();
    const countryCode = getCountryCodeFromName(e.target.search.value);
    const countryInfo = world.countries[countryCode];
    this.updateCurrentCountry(countryCode, countryInfo);
  };

  handleUpdateNotes = async () => {
    try {
      const { user, currentCountry } = this.state;

      const body = {
        username: user.username,
        country_code: currentCountry.code,
        name: currentCountry.info.name,
        notes: currentCountry.notes
      };

      const options = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const response = await axios.post(
        `${BACKEND_URL}/country_notes`,
        body,
        options
      );

      currentCountry.editNoteMode = false;
      this.setState({
        currentCountry,
        user: response.data
      });
    } catch (err) {
      console.error('Error updating notes for country!');
    }
  };

  handleUpdatePreferences = async preferences => {
    // TODO: Abort if preferences does not have valid values
    try {
      const body = { username: this.state.user.username, preferences };

      const options = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const response = await axios.put(
        `${BACKEND_URL}/update_preferences`,
        body,
        options
      );
      if (response.status === 200) {
        this.setState({ user: response.data });
      }

      if (response.status === 400)
        console.error('Preferences failed to update!');
    } catch (err) {
      console.error('There was an error trying to update preferences!');
    }
  }; // update_preferences

  hasGeolocation = () => {
    // Browsers built-in method to get a user's location
    navigator.geolocation.getCurrentPosition(
      position => {
        this.updateUserPosition(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        this.getLocationUsingIP(); //permission denied
      }
    );
  }; // hasGeolocation

  handleSignUp = async (username, email, password) => {
    // TODO: Error handling
    const body = {
      username: username,
      password: password,
      email: email
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/register`, body);
      localStorage.setItem('token', response.data.jwt_token);
      this.setState({ authenticated: true, user: response.data.user });
    } catch (e) {
      if (e.response.status === 500) {
        this.setState({
          failedSignUp: true,
          failedSignUpMessage: 'Username or password already in use!'
        });
      }
    }
  };

  isScratched = countryCode => {
    let scratched = false;
    const userCountries = [...this.state.user.countries];

    if (userCountries) {
      const found = userCountries.find(
        country => countryCode === country.country_code
      );
      scratched = found ? found.scratched : false;
    }
    return scratched;
  };

  resetAppStateError = () => {
    this.setState({
      failedSignUp: false,
      failedSignUpMessage: ''
    });
  };

  //this is used to reset the error message that pops up upon failure to sign in correctly
  //will be called if a user types into the login field or clicks sign up
  resetFailedLogin = () => {
    this.setState({
      failedLogin: false
    });
  };

  // Open/Close settings panel. Called in Nav.js
  toggleSettings = () => {
    this.setState({ showingSettings: !this.state.showingSettings });
  }; // toggleSettings

  turnOnEditNote = () => {
    const currentCountry = { ...this.state.currentCountry };
    currentCountry.editNoteMode = true;
    this.setState({
      currentCountry
    });
  };

  // Update state with currently selected country, called in Map.js
  updateCurrentCountry = async (code, info) => {
    if (!code) {
      this.setState({ currentCountryStatus: null, currentCountry: {} });
      return this.closeCountryPanel();
    }

    const geoInfo = getCountryShapeFromCode(code);
    const scratched = this.isScratched(code);
    const notes = this.getCurrentCountryNotes(code);

    // Clear currentCountry first to reset scratchcard; otherwise if you scratch
    // a card and then click on another country, the scratchcard will retain the
    // scratched state.
    // TODO: Find a way to reset scratchcard withoout multiple setStates's
    await this.setState({ currentCountry: {} });

    const currentCountry = {
      ...this.state.currentCountry,
      code,
      info,
      geoInfo,
      scratched,
      notes,
      editNoteMode: false
    };

    await this.setState({
      currentCountry,
      showingCountryPanel: true
    });
    this.updateCurrentCountryStatus();
  };

  // Get the status_code of a country saved on user if it exists
  // Otherwise, return 0
  updateCurrentCountryStatus = async () => {
    const currentCountryCode = this.state.currentCountry.code;
    const userCountries = [...this.state.user.countries];

    if (userCountries) {
      const findCountry = userCountries.find(
        country => currentCountryCode === country.country_code
      );

      const currentCountryStatus = findCountry ? findCountry.status_code : 0;
      await this.setState({ currentCountryStatus });
    }
  }; // updateCurrentCountryStatus

  // Update the user's geolocation position
  updateUserPosition = (lat, lng) => {
    this.setState({ userPosition: { lng, lat } });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          AppState: this.state,
          authenticated: this.state.authenticated,
          closeCountryPanel: this.closeCountryPanel,
          currentCountryInfo: this.state.currentCountry.geoInfo,
          resetFailedLogin: this.resetFailedLogin,
          handleChangeNote: this.handleChangeNote,
          handleScratched: this.handleScratched,
          handleSearchSubmit: this.handleSearchSubmit,
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut,
          handleSignUp: this.handleSignUp,
          handleSliderMove: this.handleSliderMove,
          handleUpdateNotes: this.handleUpdateNotes,
          handleUpdatePreferences: this.handleUpdatePreferences,
          resetAppStateError: this.resetAppStateError,
          toggleSettings: this.toggleSettings,
          turnOnEditNote: this.turnOnEditNote,
          updateCurrentCountry: this.updateCurrentCountry,
          updateUserPosition: this.handleUpdateUserPosition
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
