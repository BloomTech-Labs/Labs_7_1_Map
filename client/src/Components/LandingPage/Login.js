import React from 'react';

import './Login.css';

const Login = props => {
  return (
    <div className="Login">
      <form className="Login__LoginForm" onSubmit={props.handleSignIn}>
        <div className="LoginForm__title">Sign In</div>
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
        <button className="LoginForm__Button">Login</button>
        <div className="danger">{props.error ? props.error : ''}</div>
      </form>
    </div>
  );
};

export default Login;
