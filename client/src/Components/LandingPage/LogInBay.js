import React from 'react';
import ReactModal from 'react-modal';

import { Link } from 'react-router-dom';

import './LogInBay.css';

ReactModal.setAppElement('div');

class LogInBay extends React.Component {
  state = {
    showModal: false
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
        <Link to="/signin">
          <button type="button" className="LogInBay-LogIn">
            {/*onClick={this.handleOpenModal}*/}
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button type="button" className="LogInBay-SignUp">
            {/*onClick={this.handleOpenModal}*/}
            Sign Up
          </button>
        </Link>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Example Text"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
        >
          <p>Modal text!</p>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

export default LogInBay;
