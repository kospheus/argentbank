import React, { useState } from 'react';
import './signinform.css';
import { connect, useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authActions.js';
import {fetchAction} from '../../redux/fetchAction.js';

function SignInForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = false;

  const handleLogin = () => {

        // Les données que vous souhaitez envoyer
    const dataToSend = {
      password: document.getElementById('password').value,
      email: document.getElementById('username').value,
      // ... autres données
    };

    dispatch(login(dataToSend));
    document.location.href = "/account";
  };


  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {isAuthenticated ? (
            <p>You are logged in as {username}.</p>
          ) : (
            <button type="button" onClick={handleLogin} className="sign-in-button">
              Sign In
            </button>
          )}
        </form>
      </section>
    </main>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth?.isAuthenticated,
});

const mapDispatchToProps = {
  fetchAction,
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);