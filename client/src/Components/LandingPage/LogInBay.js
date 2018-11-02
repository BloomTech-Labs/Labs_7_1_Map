import React from 'react';
import ReactModal from 'react-modal';
import { AppContextConsumer } from '../../AppContext';

import FailedSignUpPopUp from './FailedSignUpPopUp';
import './LogInBay.css';

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

//notes from nalee
//november 1, 2018, 8pm
/*
need to have onSubmit create call submithandler
submithandler will check to see if information matches'etc
if it goes through it will call the one on the context
otherwise it will change the context state to error

*/

ReactModal.setAppElement(document.getElementById('App'));

class LogInBay extends React.Component {
  state = {
    showModal: false,
    signupUsername: '',
    signupEmail: '',
    signupPassword1: '',
    signupPassword2: '',
    signupErrorResponse: '',
    signupErrorCase: '',
    signupErrorExists: false
  };

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

  handleSignUpSubmit = event => {
    const {
      signupUsername,
      signupEmail,
      signupPassword1,
      signupPassword2
    } = this.state;
    event.preventDefault();
    
    //begin local error check

    if (
      signupUsername &&
      signupEmail &&
      signupPassword1 &&
      signupPassword2 !== ''
    ) {
      if (signupPassword1 !== signupPassword2) {
        this.setState({
          signupErrorResponse: 'Passwords do not match',
          signupErrorCase: 'local',
          signupErrorExists: true
        });
      } else {
        if (signupPassword1.length < 6) {
          this.setState({
            signupErrorResponse: 'Password must be a minimum of 6 characters',
            signupErrorCase: 'local',
            signupErrorExists: true
          });
        } else {
          if (signupUsername === signupPassword1) {
            this.setState({
              signupErrorResponse: 'Password cannot be the same as username!',
              signupErrorCase: 'local',
              signupErrorExists: true
            });
          } else {
            //no local errors detected
            this.onSignUpSubmitSuccess();
          }
        }
      }
    } else {
      this.setState({
        signupErrorResponse: 'Please complete the entire form',
        signupErrorExists: true
      });
    }
  };

  //calls handleSignUp method from context store, passing in signup field values from the state
  onSignUpSubmitSuccess = () => {
    const { signupUsername, signupEmail, signupPassword1 } = this.state;
    this.props.handleSignUp(signupUsername, signupEmail, signupPassword1);
  };

  render() {
    var FailedSignUp;
    //initially renders error popup when signupErrorExists state is set to true (See handleSignUpSubmit)
    if (this.state.signupErrorExists === true) {
      //created a switch here incase I have to have seperate functionality for remote errors (from the server)
      //(how do i get rid of the red-error-lines in the case below?)
      switch (this.state.signupErrorCase) {
        case 'local':
          FailedSignUp = (
            <FailedSignUpPopUp message={this.state.signupErrorResponse} />
          );
          break;
        case 'remote':
          FailedSignUp = (
            <FailedSignUpPopUp message={this.props.failedSignUpMessage} />
          );
        default:
          console.log('error with switch statement in LoginBay.js');
      }
    } else {
      FailedSignUp = <div> </div>;
    }
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
            <a href="http://localhost:8000/api/facebook_login">
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
              {FailedSignUp}
              {/* above is the message that pops up when a signup error occurs */}
            </ReactModal>
          </div>
        )}
      </AppContextConsumer>
    );
  }
}

export default LogInBay;
