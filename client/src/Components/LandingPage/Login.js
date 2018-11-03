import React from 'react';

import './Login.css';

const Login = props => {
  return (
    <div className="Login">
      <form className="LogInForm" onSubmit={props.handleSignIn}>
        <div className="Login__title">Sign In</div>
        <input
          type="text"
          onChange={props.handleChange}
          value={props.username}
          placeholder="Username"
          name="username"
        />
        <input
          type="password"
          onChange={props.handleChange}
          value={props.password}
          placeholder="Password"
          name="password"
        />
        <input type="submit" />
      </form>
      <div>Sign Up</div>
    </div>
  );
};

export default Login;
