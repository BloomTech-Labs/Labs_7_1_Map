import React from 'react';
import ReactModal from 'react-modal';
import { AppContextConsumer } from '../../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FailedSignUpPopUp from './FailedSignUpPopUp';
import './LogInBay.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SignUpModalStyles = {
  content: {
    display: 'flex',
    flexFlow: 'column noWrap',
    height: '410px',
    width: '20%',
    top: '55%',
    left: '40%',
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
            <div className="LogInBay__Container">
              <form className="Container__LogInForm" onSubmit={handleSignIn}>
                Login with your account:
                <input type="text" placeholder="Username" name="username" />
                <input type="password" placeholder="Password" name="password" />
                <input
                  type="submit"
                  className="LogInBay__LogInButton"
                  value="Login"
                />
              </form>

              <a href={`${BACKEND_URL}/facebook_login`} className="Container__Button">Login with Facebook</a>

              <button
                type="button"
                className="Container__Button"
                onClick={this.handleOpenModal}
              >
                New? Sign Up
              </button>
            </div>

            <ReactModal
              id="SignUpModal"
              style={SignUpModalStyles}
              isOpen={this.state.showModal}
              contentLabel="Example Text"
              onRequestClose={this.handleCloseModal}
              shouldCloseOnOverlayClick={true}
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
                <input type="submit" />
              </form>
              <FailedSignUpPopUp message={this.state.signupErrorResponse} />
            </ReactModal>
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

export default LogInBay;
