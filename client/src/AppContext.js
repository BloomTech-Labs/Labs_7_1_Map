import React, { Component } from 'react';
import axios from 'axios';
import { clearLocalstorage, getCountryShapeFromCode } from './utils.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// new context
const AppContext = React.createContext();

// provider component
export class AppContextProvider extends Component {
  state = {
    authenticated: false,
    countryPanelIsOpen: false,
    currentCountry: {
      code: '',
      info: {},
      geoInfo: {},
      scratched: false,
      notes: '',
      editNoteMode: false
    },
    currentCountryStatus: null,
    signup: false,
    user: {},
    userPosition: { lat: 22.28552, lng: 114.15769 }
  };

  async componentDidMount() {
    // Check if a user is already logged in
    try {
      // Retrieve token and user stored in local storage
      const token = localStorage.getItem('token');
      const user = await JSON.parse(localStorage.getItem('user'));

      if (token && user) {
        const requestOptions = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Get the user info from DB
        const response = await axios.get(
          `${BACKEND_URL}/get_user/${user.id}`,
          requestOptions
        );

        if (response.status === 200) {
          this.setState({
            authenticated: true,
            user: { ...response.data }
          });
        } else {
          clearLocalstorage(); // response was not 200
        }
      } else {
        clearLocalstorage(); // token or user not in localstorage
      }
    } catch (e) {
      // failed async
      clearLocalstorage(); // error encountered
    }

    // Ask for user location if browser is compatible
    if ('geolocation' in navigator) {
      this.hasGeolocation();
    } else {
      this.getLocationUsingIP(); // geo location not available on device
    }
  } // componentDidMount

  closeCountryPanel = () => {
    this.setState({
      countryPanelIsOpen: false
    });
  }; // closeCountryPanel

  displaySignUp = () => {
    this.setState({ signup: true });
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

  // Get the status_code of a country saved on user if it exists
  // Otherwise, return 0
  getCurrentCountryStatus = () => {
    // TODO: This function could probably just call setState here
    // instead of doing that in the function that uses it
    const currentCountryCode = this.state.currentCountry.code;
    const userCountries = [...this.state.user.countries];

    if (userCountries) {
      const findCountry = userCountries.find(
        country => currentCountryCode === country.country_code
      );

      return findCountry ? findCountry.status_code : 0;
    }
  }; // getCurrentCountryStatus

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

  handleChange = e => {
    const user = { ...this.state.user };
    user.error = '';
    user[e.target.name] = e.target.value;
    console.log(user);
    this.setState({ user });
  };

  handleChangeNote = e => {
    const currentCountry = { ...this.state.currentCountry };
    currentCountry[e.target.name] = e.target.value;
    this.setState({ currentCountry });
  };

  handleScratched = async () => {
    try {
      const { user, currentCountry } = this.state;

      const body = {
        username: user.username,
        country_code: currentCountry.code,
        name: currentCountry.info.name,
        scratched: true,
        notes: currentCountry.notes
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
    const user = { ...this.state.user };

    console.log(user, 'IN THE APP');

    const body = {
      username: user.username,
      password: user.password
    };
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, body);
      const user = await JSON.stringify(response.data.user);
      localStorage.setItem('token', response.data.jwt_token);
      localStorage.setItem('user', user);
      this.setState({
        authenticated: true,
        user: { ...response.data.user }
      });
    } catch (e) {
      // failed async
      user.error = 'Incorrect username/password';
      this.setState({ user });
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
    const user = JSON.stringify(response.data.user);
    localStorage.setItem('token', response.data.jwt_token);
    localStorage.setItem('user', user);
    this.setState({
      authenticated: true,
      user: response.data.user
    });
  }; // handleSignUp

  // Called in BorderBay.js
  handleSliderMove = async value => {
    try {
      const { user, currentCountry } = this.state;

      const body = {
        username: user.username,
        country_code: currentCountry.code,
        name: currentCountry.info.name,
        status_code: value,
        scratched: currentCountry.scratched,
        notes: currentCountry.notes
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
      this.setState({
        currentCountryStatus: this.getCurrentCountryStatus()
      });
    } catch (err) {
      console.error('Error updating country status!');
    }
  }; // handleSliderMove

  // Update state with currently selected country, called in Map.js
  handleUpdateCurrentCountry = (code, info) => {
    const geoInfo = getCountryShapeFromCode(code);
    const scratched = this.isScratched(code);
    const notes = this.getCurrentCountryNotes(code);

    const currentCountry = {
      ...this.state.currentCountry,
      code,
      info,
      geoInfo,
      scratched,
      notes,
      editNoteMode: false
    };
    this.setState({
      currentCountry,
      countryPanelIsOpen: true
    });
    this.setState({
      currentCountryStatus: this.getCurrentCountryStatus()
    });
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

      const response = await axios.post(`${BACKEND_URL}/notes`, body, options);

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
        console.log(
          'Preferences were updated successfully!',
          response.status,
          response.data
        );
        this.setState({ user: response.data });
      }

      if (response.status === 400)
        console.log(
          'Preferences failed to update!',
          response.status,
          response.body
        );
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

  hideSignUp = () => {
    this.setState({ signup: false });
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

  turnOnEditNote = () => {
    const currentCountry = { ...this.state.currentCountry };
    currentCountry.editNoteMode = true;
    this.setState({
      currentCountry
    });
  };

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
          displaySignUp: this.displaySignUp,
          handleChange: this.handleChange,
          handleChangeNote: this.handleChangeNote,
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut,
          handleSignUp: this.handleSignUp,
          handleSliderMove: this.handleSliderMove,
          handleScratched: this.handleScratched,
          handleUpdateNotes: this.handleUpdateNotes,
          handleUpdatePreferences: this.handleUpdatePreferences,
          hideSignUp: this.hideSignUp,
          turnOnEditNote: this.turnOnEditNote,
          updateCurrentCountry: this.handleUpdateCurrentCountry,
          updateUserPosition: this.handleUpdateUserPosition
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
