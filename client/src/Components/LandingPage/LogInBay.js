import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { AppContextConsumer } from '../../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FailedSignUpPopUp from './FailedSignUpPopUp';
import './LogInBay.css';
import facebookButton from '../../facebook-login.png';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SignUpModalStyles = {
  content: {
    display: 'flex',
    flexFlow: 'column noWrap',
    height: '440px',
    width: '25%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid white'
  }
};

const FacebookModalStyle = {
  content: {
    display: 'flex',
    flexFlow: 'column noWrap',
    height: 'auto',
    width: '25%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid white'
  }
};

ReactModal.setAppElement(document.getElementById('App'));

class LogInBay extends React.Component {
  state = {
    showModal: false,
    showFacebookTutorial: false,
    signupUsername: '',
    signupEmail: '',
    signupPassword1: '',
    signupPassword2: '',
    signupErrorResponse: ''
  };

  componentDidUpdate = prevProps => {
    if (prevProps.failedSignUp !== this.props.failedSignUp) {
      this.setState({
        signupErrorResponse: this.props.failedSignUpMessage
      });
    }
  };
  //above, most of these states are updated by typing into the field

  handleOpenModal = () => {
    this.resetFailedLogin();
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    this.resetFailedSignUp();
  };

  handleOpenFacebookTutorial = () => {
    this.setState({ showFacebookTutorial: true });
  };

  handleCloseFacebookTutorial = () => {
    this.setState({ showFacebookTutorial: false });
  };

  //These update state when signup fields are changed
  handleChangeSignUpUsername = event => {
    this.resetFailedSignUp();
    this.setState({ signupUsername: event.target.value });
  };

  handleChangeSignUpEmail = event => {
    this.setState({ signupEmail: event.target.value });
    this.resetFailedSignUp();
  };

  handleChangeSignUpPassword1 = event => {
    this.setState({ signupPassword1: event.target.value });
    this.resetFailedSignUp();
  };

  handleChangeSignUpPassword2 = event => {
    this.setState({ signupPassword2: event.target.value });
    this.resetFailedSignUp();
  };
  //------------------------------------------------------

  //Reset failed login popup
  //This will be called when a user changes their current login information or click sign up
  resetFailedLogin = () => {
    if (this.props.failedLogin) {
      this.props.resetFailedLogin();
    }
  };

  //reset failed signup message
  //will be called whenever a user types in the signup field or exits out
  resetFailedSignUp = () => {
    if (this.signupErrorResponse !== '') {
      this.setState({
        signupErrorResponse: ''
      });
    }
  };

  handleSignUpSubmit = async event => {
    event.preventDefault();
    await this.props.resetAppStateError();
    this.handleErrorChecks();
  };

  handleErrorChecks = () => {
    const {
      signupUsername,
      signupEmail,
      signupPassword1,
      signupPassword2
    } = this.state;

    if (
      !signupUsername ||
      !signupEmail ||
      !signupPassword1 ||
      !signupPassword2
    ) {
      return this.setState({
        signupErrorResponse: 'Please fill all fields before submitting'
      });
    } else {
      if (signupPassword1 !== signupPassword2) {
        return this.setState({
          signupErrorResponse: 'Passwords do not match'
        });
      }
      if (signupPassword1.length < 6) {
        return this.setState({
          signupErrorResponse: 'Password must be a minimum of 6 characters'
        });
      }
      if (signupUsername === signupPassword1) {
        return this.setState({
          signupErrorResponse: 'Password cannot be the same as username!'
        });
      }
      this.props.handleSignUp(signupUsername, signupEmail, signupPassword1);
    }
  };

  render() {
    return (
      <AppContextConsumer>
        {({ handleSignIn }) => (
          <div className="LogInBay">
            <div className="LogInBay__Container">
              <form className="Container__LogInForm" onSubmit={handleSignIn}>
                Log into personal account:
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={this.resetFailedLogin}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.resetFailedLogin}
                />
                <input
                  type="submit"
                  className="LogInBay__LogInButton"
                  value="Login"
                />
              </form>
              <button
                type="button"
                className="Container__Button"
                onClick={this.handleOpenModal}
              >
                Sign Up with email
              </button>
              <div className="Container__Or">or</div>
              <div
                onClick={this.handleOpenFacebookTutorial}
                className="Container__FacebookInfoLink"
              >
                Learn about using MapScratcher with your FaceBook Friends!
              </div>
              <a
                href={`${BACKEND_URL}/facebook_login`}
                className="Container__Button"
              >
                <img
                  src={facebookButton}
                  alt="Login with Facebook"
                  style={{ width: '100%' }}
                />
              </a>
            </div>

            <ReactModal
              id="SignUpModal"
              style={SignUpModalStyles}
              isOpen={this.state.showModal}
              contentLabel="Example Text"
              onRequestClose={this.handleCloseModal}
              shouldCloseOnOverlayClick={true}
              ariaHideApp={false}
            >
              <div className="Modal__Header">
                <h3>Sign Up</h3>
                <FontAwesomeIcon
                  className="closeSignUp"
                  onClick={this.handleCloseModal}
                  icon="times"
                />
              </div>
              <form
                className="Modal__Form"
                onSubmit={this.handleSignUpSubmit}
                style={{ display: 'flex', flexFlow: 'column nowrap' }}
              >
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChangeSignUpUsername}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChangeSignUpEmail}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChangeSignUpPassword1}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={this.handleChangeSignUpPassword2}
                />
                <FailedSignUpPopUp message={this.state.signupErrorResponse} />
                <input type="submit" />
              </form>
            </ReactModal>
            <ReactModal
              id="FacebookModal"
              style={FacebookModalStyle}
              isOpen={this.state.showFacebookTutorial}
              contentLabel="Example Text"
              onRequestClose={this.handleCloseFacebookTutorial}
              shouldCloseOnOverlayClick={true}
              ariaHideApp={false}
            >
              <div className="FacebookModal__FBContainer">
                <div className="FBContainer__Header">
                  <h3>Connect with Facebook Friends on MapScratcher!</h3>
                  <FontAwesomeIcon
                    className="Header__Close"
                    onClick={this.handleCloseFacebookTutorial}
                    icon="times"
                  />
                </div>
                <div className="FBContainer__Words">
                  MapScratcher lets you select countries, assign them a level of
                  interaction (visited, lived-in etc.), and leave a note for
                  each!
                  <br />
                  <br />
                  Using Facebook to log in allows you to connect
                  with your Facebook friends also using MapScratcher.
                  <br />
                  <br />
                  You'll see where they've been and how they've interacted with
                  countries around the globe!
                </div>
              </div>
            </ReactModal>
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

LogInBay.propTypes = {
  failedSignUp: PropTypes.bool,
  handleSignUp: PropTypes.func,
  failedSignUpMessage: PropTypes.string,
  resetAppStateError: PropTypes.func
};

export default LogInBay;
