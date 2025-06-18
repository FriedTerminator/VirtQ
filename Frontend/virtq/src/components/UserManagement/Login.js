import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { clearErrors, login } from '../../actions/securityActions';
import { useNavigate } from 'react-router-dom';

function Login({ login, security, errors, clearErrors}) {
  const navigate = useNavigate(); // ✅ Call it here at the top of your component

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localErrors, setLocalErrors] = useState({});

  // ✅ Redirect when user is authenticated
  useEffect(() => {
    if (security?.validToken) {
      navigate('/dashboard');
    }
  }, [security, navigate]);

  // Update local errors if props.errors change
  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    }
  }, [errors]);

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const LoginRequest = {
      username,
      password,
    };
    login(LoginRequest); // This should update state which triggers navigate via useEffect
  };

  return (
    <div className="login top">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': localErrors.username,
                  })}
                  placeholder="Email Address"
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
              <input
                type="submit"
                className="btn btn-info btn-block"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  security: PropTypes.shape({
    validToken: PropTypes.bool,
  }),
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  security: state.security || {},
  errors: state.errors || {}
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
