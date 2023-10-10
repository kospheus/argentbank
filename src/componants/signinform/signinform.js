import React, { useState } from 'react';
import './signinform.css';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/signin.action';

function SignInForm({ login }) {
  const [username, setUsername] = useState(''); // Déclarez username en tant que variable d'état
  const [password, setPassword] = useState(''); // Déclarez password en tant que variable d'état

  const handleLogin = async () => {
    // Utilisez les valeurs actuelles de username et password
    await login(username, password);
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
          <button type="button" onClick={handleLogin} className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth ? state.auth.isAuthenticated : false,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);