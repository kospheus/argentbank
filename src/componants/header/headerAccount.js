import React from 'react';
import './header.css';
import Logo from '../../assets/argentBankLogo.png';
import { connect } from 'react-redux';
import { logout } from '../../redux/out/outActions';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate depuis react-router-dom

function Header({ isAuthenticated, logout }) {
  const navigate = useNavigate(); // Obtenez la fonction de navigation

  const handleLogout = () => {
    logout();
    navigate('/'); // Rediriger vers la page d'accueil après la déconnexion
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {isAuthenticated ? (
          <a className="main-nav-item" href="#" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        ) : (
          <a className="main-nav-item" href="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);