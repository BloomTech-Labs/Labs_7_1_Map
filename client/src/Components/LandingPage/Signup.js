import React from 'react';

import './Signup.css';

const Signup = props => {
  let [usernameError, emailError, passwordError, passwordComfirmError] = [
    null,
    null,
    null,
    null
  ];

  console.log(props.signupErrors);
  if (Object.keys(props.signupErrors).length > 0) {
    if (props.signupErrors.username)
      usernameError = props.signupErrors.username;
    if (props.signupErrors.email) emailError = props.signupErrors.email;
    if (props.signupErrors.password)
      passwordError = props.signupErrors.password;
    if (props.signupErrors.passwordComfirm)
      passwordComfirmError = props.signupErrors.passwordComfirm;
  }
  return (
    <div className="Signup">
      <form className="Signup__SignupForm" onSubmit={props.handleSignUp}>
        <div className="SignupForm__title">Sign Up</div>
        <input
          className={usernameError ? 'BorderError' : ''}
          type="text"
          onChange={props.handleChange}
          value={props.username}
          placeholder="Username"
          name="username"
        />
        <span className="danger">{usernameError ? usernameError : ''}</span>
        <input
          className={emailError ? 'BorderError' : ''}
          type="email"
          onChange={props.handleChange}
          value={props.email}
          placeholder="email address"
          name="email"
        />
        <span className="danger">{emailError ? emailError : ''}</span>
        <input
          className={passwordError ? 'BorderError' : ''}
          type="password"
          onChange={props.handleChange}
          value={props.password}
          placeholder="Password"
          name="password"
        />
        <span className="danger">{passwordError ? passwordError : ''}</span>
        <input
          className={passwordComfirmError ? 'BorderError' : ''}
          type="password"
          onChange={props.handleChange}
          value={props.passwordComfirm}
          placeholder="Password again"
          name="passwordComfirm"
        />
        <span className="danger">
          {passwordComfirmError ? passwordComfirmError : ''}
        </span>

        <button className="SignupForm__Button">Sign Up</button>
        <div className="danger">{props.error ? props.error : ''}</div>
      </form>
      <button className="LoginForm__Login" onClick={props.hideSignUp}>
        Login with username/password
      </button>
    </div>
  );
};

export default Signup;
