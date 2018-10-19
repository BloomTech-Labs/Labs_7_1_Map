import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './SignUp.css';

const URL = process.env.REACT_APP_LOCAL_BACKEND_URL || "http://127.0.0.1:8000";;

class SignUp extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordComfirm: '',
		errorMessage: {},
		error: '',
	};

	handleChange = (e) => {
		const errors = { ...this.state.errorMessage };

		// remove a specific error
		delete errors[e.target.name];
		this.setState({
			[e.target.name]: e.target.value,
			errorMessage: errors,
			error: '',
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const error = {};
		// check required fields
		[ 'username', 'email', 'password' ].forEach((field) => {
			if (!this.state[field]) {
				error[field] = `${field} is required`;
			}
		});

		// check the password
		if (this.state.password.length < 6) {
			error.password = 'password must have 6 or characters';
		} else if (this.state.password !== this.state.passwordComfirm) {
			error.password = 'The password do not match';
		}

		// check if the error object is empty
		if (Object.keys(error).length > 0) {
			this.setState({ errorMessage: error });
			return; // terminate the process
		}

		const user = {
			...this.state,
		};

		// remove the error object, error string and confirm password
		delete user.errorMessage;
		delete user.passwordComfirm;
		delete user.error;

		(async () => {
			try {
				const response = await axios.post(`${URL}/api/register/`, user);

				const data = response.data;

				if (data.jwt_token) {
					// set the token to local storage
					localStorage.setItem('jwt_token', data.jwt_token);

					// reset the fields
					this.setState({
						username: '',
						password: '',
						email: '',
						firstname: '',
						lastname: '',
						passwordComfirm: '',
						errorMessage: {},
						error: '',
					});
				} else {
					this.setState({ error: 'user was not created! Unexpected error!' });
					return; // terminate the process
				}
			} catch (err) {
				if (process.env.REACT_APP_DEV) {
					console.log(err);
				}
				this.setState({ error: 'user was not created! Unexpected error!' });
				return; // terminate the process
			}
		})(); // self executing function
	};

	render() {
		const { username: usernameError, email: emailError, password: passwordError } = this.state.errorMessage;
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
						<span className="danger">{usernameError ? usernameError : ''}</span>
						<input
							onChange={this.handleChange}
							value={this.state.email}
							name="email"
							type="email"
							className="form__input"
							placeholder="email"
						/>
						<span className="danger">{emailError ? emailError : ''}</span>
						<input
							onChange={this.handleChange}
							value={this.state.password}
							name="password"
							type="password"
							className="form__input"
							placeholder="password"
						/>
						<span className="danger">{passwordError ? passwordError : ''}</span>
						<input
							onChange={this.handleChange}
							value={this.state.passwordComfirm}
							name="passwordComfirm"
							type="password"
							className="form__input"
							placeholder="confirm password"
						/>

						<button className="form__button">Sign Up</button>
						<span className="danger">{this.state.error ? this.state.error : ''}</span>
					</form>
				</div>
			</div>
		);
	}
}

SignUp.propTypes = {
	username: PropTypes.string,
	email: PropTypes.string,
	password: PropTypes.string,
	passwordComfirm: PropTypes.string,
};

export default SignUp;
