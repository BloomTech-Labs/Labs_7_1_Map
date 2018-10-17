import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './SignUp.css';

const URL = process.env.REACT_APP_URL;

class SignUp extends Component {
	state = {
		username: '',
		password: '',
		passwordComfirm: '',
		errorMessage: '',
	};

	componentDidMount() {}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// check the username are not empty
		if (this.state.username) {
			// check the password field is not empty
			if (!this.state.password) {
				this.setState({ errorMessage: 'Please enter a password' });
				return; // terminates the handle function function
			}
			if (this.state.password.length < 6) {
				this.setState({ errorMessage: 'Please enter a password that is 6 characters or longer' });
				return;
			}
			// check if the passwords match
			if (this.state.password !== this.state.passwordComfirm) {
				this.setState({ errorMessage: 'The password does not match' });
			} else {
				// ready to sign up
				const user = {
					username: this.state.username,
					password: this.state.password,
				};

				axios
					.post(`${URL}/api/register/`, user)
					.then((response) => {
						// set the token to local storage
						localStorage.setItem('jwt_token', response.data.token);

						// reset the fields
						this.setState({
							username: '',
							password: '',
							passwordComfirm: '',
							errorMessage: '',
						});
					})
					.catch((err) => {
						if (err) {
							this.setState({
								errorMessage: 'Error encountered',
							});
						}
						console.log(err);
					});
			}
		} else {
			this.setState({ errorMessage: 'Please enter a username' });
		}
	};

	render() {
		return (
			<div className="SignUp">
				<div className="SignUp__card">
					<form onSubmit={this.handleSubmit}>
						<input
							onChange={this.handleChange}
							value={this.state.username}
							name="username"
							type="text"
							className="form__input"
							placeholder="Username"
						/>

						<input
							onChange={this.handleChange}
							value={this.state.password}
							name="password"
							type="password"
							className="form__input"
							placeholder="password"
						/>

						<input
							onChange={this.handleChange}
							value={this.state.passwordComfirm}
							name="passwordComfirm"
							type="password"
							className="form__input"
							placeholder="confirm password"
						/>

						<button className="form__button">Sign Up</button>
						<div className="danger">{this.state.errorMessage ? this.state.errorMessage : ''}</div>
					</form>
				</div>
			</div>
		);
	}
}

SignUp.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string,
	passwordComfirm: PropTypes.string,
};

export default SignUp;
