import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function Login({ security, errors, navigate }) {
  // Local state for username, password, and errors
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localErrors, setLocalErrors] = useState({});

  /**
   * 1. If a valid token exists, navigate to /dashboard on mount or
   *    whenever `security?.validToken` changes.
   */
  useEffect(() => {
    if (security?.validToken) {
      navigate('/dashboard');
    }
  }, [security, navigate]);

  /**
   * 2. If `errors` prop changes, sync it to localErrors state.
   */
  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    }
  }, [errors]);

  /**
   * 3. Handle input changes
   */
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  /**
   * 4. Handle form submission
   */
  const onSubmit = (e) => {
    e.preventDefault();
    const LoginRequest = {
      username,
      password,
    };
    console.log('Login request submitted', LoginRequest);

    // Do your login/validation request here.
    // If successful, navigate to the dashboard:
    navigate('/dashboard');
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
  // Provided by parent or Redux/Context
  security: PropTypes.shape({
    validToken: PropTypes.bool,
  }),
  errors: PropTypes.object.isRequired,
  // Provided by react-router-dom (if using v6 with a custom HOC or pass as prop)
  navigate: PropTypes.func.isRequired,
};

export default Login;
