import React from 'react';
import ReactModal from 'react-modal';
import { AppContextConsumer } from '../../AppContext';

import FailedSignUpPopUp from './FailedSignUpPopUp';
import './LogInBay.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SignUpModalStyles = {
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '300px',
    width: '300px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '3px dashed red'
  }
};

ReactModal.setAppElement(document.getElementById('App'));

class LogInBay extends React.Component {
  state = {
    showModal: false,
    signupUsername: '',
    signupEmail: '',
    signupPassword1: '',
    signupPassword2: '',
    signupErrorResponse: '',
    errorExists: false
  };

  componentDidUpdate = prevProps => {
    if (prevProps.failedSignUp !== this.props.failedSignUp) {
      this.setState({
        signupErrorResponse: this.props.failedSignUpMessage,
        errorExists: this.props.failedSignUp
      });
    }
  };
  //above, most of these states are updated by typing into the field

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  //These update state when signup fields are changed
  handleChangeSignUpUsername = event => {
    this.setState({ signupUsername: event.target.value });
  };

  handleChangeSignUpEmail = event => {
    this.setState({ signupEmail: event.target.value });
  };

  handleChangeSignUpPassword1 = event => {
    this.setState({ signupPassword1: event.target.value });
  };

  handleChangeSignUpPassword2 = event => {
    this.setState({ signupPassword2: event.target.value });
  };
  //------------------------------------------------------

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
        signupErrorResponse: 'Please fill all fields before submitting',
        errorExists: true
      });
    } else {
      if (signupPassword1 !== signupPassword2) {
        return this.setState({
          signupErrorResponse: 'Passwords do not match',
          errorExists: true
        });
      }
      if (signupPassword1.length < 6) {
        return this.setState({
          signupErrorResponse: 'Password must be a minimum of 6 characters',
          errorExists: true
        });
      }
      if (signupUsername === signupPassword1) {
        return this.setState({
          signupErrorResponse: 'Password cannot be the same as username!',
          errorExists: true
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
            <form className="LogInForm" onSubmit={handleSignIn}>
              Sign In
              <input type="text" placeholder="Username" name="username" />
              <input type="password" placeholder="Password" name="password" />
              <input type="submit" />
            </form>
            <br />
            <p> - or -</p>
            <br />
            <a href={`${BACKEND_URL}/facebook_login`}>
              Login with Facebook
            </a>
            <br />
            <p> - or -</p>
            <br />

            <button
              type="button"
              className="LogInBay__SignUpButton"
              onClick={this.handleOpenModal}
            >
              Sign Up
            </button>

            <ReactModal
              id="SignUpModal"
              style={SignUpModalStyles}
              isOpen={this.state.showModal}
              contentLabel="Example Text"
              onRequestClose={this.handleCloseModal}
              shouldCloseOnOverlayClick={true}
            >
              <p>Sign Up</p>
              <form
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
                <input type="submit" />
              </form>
              <button onClick={this.handleCloseModal}>Close Modal</button>
              <FailedSignUpPopUp message={this.state.signupErrorResponse} />
            </ReactModal>
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

export default LogInBay;
