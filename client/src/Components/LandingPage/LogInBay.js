import React from 'react';
import ReactModal from 'react-modal';

import './LogInBay.css';

// ReactModal.setAppElement('#SignUpModal');

const customStyles = {
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

  handleLogin = e => {
    e.preventDefault();
    this.props.updateUserData();
    console.log(this.props);
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
        <form className="LoginForm" onSubmit={this.handleLogin}>
          Login
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <input type="submit" />
        </form>
        <button
          type="button"
          className="LogInBay-SignUp"
          onClick={this.handleOpenModal}
        >
          Sign Up
        </button>
        <ReactModal
          id="SignUpModal"
          style={customStyles}
          isOpen={this.state.showModal}
          contentLabel="Example Text"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
        >
          <p>Modal text!</p>
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
