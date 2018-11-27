import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import wc from 'which-country';
import world from 'country-data';
import {
  clearLocalstorage,
  getCountryInfoFromCode,
  getCountryCodeFromName,
  getCountryShapeFromCode
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

        // Update state with user data if it was successfully retrieved from DB
        if (response.status === 200)
          await this.setState({
            authenticated: true,
            user: { ...response.data }
          });
      }

      // Get a users facebook friends if they signed up with facebook
      if (this.state.user.facebook) {
        try {
          const { id, accessToken } = this.state.user.facebook;
          const facebookResponse = await axios.get(
            `https://graph.facebook.com/${id}/friends?access_token=${accessToken}`
          );
          await this.setState({ friends: facebookResponse.data.data });
        } catch (err) {
          console.error('Failed to get facebook friends!'); // eslint-disable-line
        }
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
  closeCountryPanel = async () => {
    await this.setState({
      showingCountryPanel: false
    });
  }; // closeCountryPanel

  // Get a list of friends that also have the country saved
  // Only called if user has signed up with Facebook
  getCountryFriends = async () => {
    try {
      const body = {
        friends: this.state.friends,
        country_code: this.state.currentCountry.code
      };

      const options = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      // get FB friends
      const response = await axios.post(
        `${BACKEND_URL}/get_country_friends`,
        body,
        options
      );

      this.setState({
        currentCountry: {
          ...this.state.currentCountry,
          friends: response.data
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

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

  getLocationUsingIP = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json');

      if (response.status === 200)
        this.updateUserPosition(
          response.data.latitude,
          response.data.longitude
        );
    } catch (err) {
      console.error('Failed to get location using IP!', err); // eslint-disable-line
    }
  };

  handleChangeNote = e => {
    const currentCountry = { ...this.state.currentCountry };
    currentCountry[e.target.name] = e.target.value;
    this.setState({ currentCountry });
  };

  handleFriendsDropdown = async e => {
    this.closeCountryPanel();
    try {
      const id = e.target.value;
      if (id === 'user') return this.setState({ friendBeingViewed: null });
      else {
        // Set friendBeingViewed to empty array to fix following bug:
        //    Switching to a different friends map view would not render a country if
        //    it was also rendered on the user's own map.
        //    Most likely a limitation with Leaflet so there may not be a better solution.
        this.setState({ friendBeingViewed: [] });

        const options = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        };
        const response = await axios.get(
          `${BACKEND_URL}/get_friends_countries?id=${id}`,
          options
        );

        if (response.status === 200) {
          return this.setState({
            friendBeingViewed: response.data,
            currentCountry: {}
          });
        }
        // TODO: Add error handling if a getting a friends countries failed
        else console.error('Failed to get that friends countries!'); //eslint-disable-line
      }
    } catch (err) {
      return console.log(err); // eslint-disable-line
    }
  };

  handleScratched = async () => {
    try {
      const { currentCountry } = this.state;

      const body = {
        country_code: currentCountry.code,
        name: currentCountry.info.name,
        scratched: true
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
      console.error('Error updating scratched country!'); // eslint-disable-line
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
      console.error('Error updating country status!'); // eslint-disable-line
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
      console.error('Error updating notes for country!'); // eslint-disable-line
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
        console.error('Preferences failed to update!'); // eslint-disable-line
    } catch (err) {
      console.error('There was an error trying to update preferences!'); // eslint-disable-line
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

  // Called in Map.js
  handleMapClick = async e => {
    if (this.state.friendBeingViewed === null) {
      // Get the country code of the location clicked on, e.g. 'MEX'
      const countryCode = await wc([e.latlng.lng, e.latlng.lat]);

      const countryInfo = getCountryInfoFromCode(countryCode);

      // Update AppContext with the info of the currently selected country
      this.updateCurrentCountry(countryCode, countryInfo);
    }
  };

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

  // This is used to reset the error message shown upon failure to sign in
  // Will be called if a user types into the login field or clicks sign up
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
    // If a user clicks on something that is not a country:
    //  - Close the country panel
    //  - Update the currentCountryStatus after CSS transition is complete
    if (!code) {
      await this.closeCountryPanel();
      setTimeout(
        () => this.setState({ currentCountryStatus: null, currentCountry: {} }),
        500 // This should be the same as the transition length set in CountryPanel.less
      );
      return;
    }

    const geoInfo = await getCountryShapeFromCode(code);
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
      geoInfo,
      info,
      scratched,
      notes,
      editNoteMode: false
    };

    await this.setState({
      currentCountry,
      showingCountryPanel: true
    });
    await this.updateCurrentCountryStatus();

    if (this.state.user.facebook) await this.getCountryFriends();
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
          getCountryFriends: this.getCountryFriends,
          handleChangeNote: this.handleChangeNote,
          handleFriendsDropdown: this.handleFriendsDropdown,
          handleMapClick: this.handleMapClick,
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

AppContextProvider.propTypes = {
  children: PropTypes.any
};

export const AppContextConsumer = AppContext.Consumer;
