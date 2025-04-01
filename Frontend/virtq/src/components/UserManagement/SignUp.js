import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createNewUser } from '../../actions/securityActions';
import { useNavigate } from 'react-router-dom';

function SignUp({ createNewUser, errors }) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    }
  }, [errors]);

  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  /**
   * Handle form submission
   */
  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
    };

    createNewUser(newUser, navigate);
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': localErrors.firstName,
                  })}
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                />
                {localErrors.firstName && (
                  <div className="invalid-feedback">{localErrors.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': localErrors.lastName,
                  })}
                  placeholder="Full Name"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                />
                {localErrors.lastName && (
                  <div className="invalid-feedback">{localErrors.lastName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': localErrors.username,
                  })}
                  placeholder="Email Address (Username)"
                  name="username"
                  value={username}
                  onChange={onChange}
                />
                {localErrors.username && (
                  <div className="invalid-feedback">{localErrors.username}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': localErrors.password,
                  })}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
                {localErrors.password && (
                  <div className="invalid-feedback">{localErrors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': localErrors.confirmPassword,
                  })}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                />
                {localErrors.confirmPassword && (
                  <div className="invalid-feedback">{localErrors.confirmPassword}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block" value="Sign Up" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors || {},
  security: state.security || {}
})

export default connect(mapStateToProps, {createNewUser})(SignUp);
