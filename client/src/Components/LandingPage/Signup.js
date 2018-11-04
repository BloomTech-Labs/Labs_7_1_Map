import React from 'react';

import './Signup.css';

const Signup = props => {
  return (
    <div className="Signup">
      <form className="Signup__SignupForm" onSubmit={props.handleSignUp}>
        <div className="SignupForm__title">Sign Up</div>
        <input
          type="text"
          onChange={props.handleChange}
          value={props.username}
          placeholder="Username"
          name="username"
        />
        <span className="danger">
          {props.signupError && props.signupError.username
            ? props.signupError.username
            : ''}
        </span>
        <input
          type="email"
          onChange={props.handleChange}
          value={props.email}
          placeholder="email address"
          name="email"
        />
        <span className="danger">
          {props.signupError && props.signupError.email
            ? props.signupError.email
            : ''}
        </span>
        <input
          type="password"
          onChange={props.handleChange}
          value={props.password}
          placeholder="Password"
          name="password"
        />
        <span className="danger">
          {props.signupError && props.signupError.password
            ? props.signupError.password
            : ''}
        </span>
        <input
          type="password"
          onChange={props.handleChange}
          value={props.passwordComfirm}
          placeholder="Password again"
          name="passwordComfirm"
        />
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
