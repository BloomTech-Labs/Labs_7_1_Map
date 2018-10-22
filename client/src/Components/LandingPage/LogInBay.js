import React from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

import './LogInBay.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// ReactModal.setAppElement('div');

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

class LogInBay extends React.Component {
  state = {
    showModal: false
  };

  handleLogin = async e => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    const response = await axios.post(`${BACKEND_URL}/login`, body);
    await this.props.updateUserData(response.data.user);
  };

  handleSignUp = e => {
    e.preventDefault();
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="LogInBay">
        <form className="LogInForm" onSubmit={this.handleLogin}>
          Sign In
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Password" name="password" />
          <input type="submit" />
        </form>
        <br />
        <p> - or -</p>
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
          <form style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Confirm Password" />
            <input type="submit" />
          </form>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

export default LogInBay;
