import React from 'react';
import ReactModal from 'react-modal';

import './LogInBay.css';

ReactModal.setAppElement('div');

class LogInBay extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	render() {
		return (
			<div className="LogInBay">
				<button type="button" className="LogInBay-LogIn" onClick={this.handleOpenModal}>
					Log In
				</button>
				<button type="button" className="LogInBay-SignUp" onClick={this.handleOpenModal}>
					Sign Up
				</button>
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
