import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

function Header({ security, logout }) {
  const navigate = useNavigate();
  const { validToken, user } = security;

  const handleLogout = (e) => {
    e.preventDefault();
    logout(navigate);
  };

  const userIsAuthenticated = (
    <div className="collapse navbar-collapse" id="mobile-nav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-user-circle mr-1" />
            {user.fullName}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

  const userIsNotAuthenticated = (
    <div className="collapse navbar-collapse" id="mobile-nav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          VirtQ
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {validToken && user ? userIsAuthenticated : userIsNotAuthenticated}
      </div>
    </nav>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  security: state.security
});

export default connect(mapStateToProps, { logout })(Header);
