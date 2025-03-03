import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function SignUp({ errors }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [localErrors, setLocalErrors] = useState({});

  /**
   * Sync incoming `errors` prop to local state whenever `errors` changes
   */
  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    }
  }, [errors]);

  /**
   * Handle input changes
   */
  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
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
      fullName,
      username,
      password,
      confirmPassword,
    };

    console.log('You have signed up', newUser);
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
                    'is-invalid': localErrors.fullName,
                  })}
                  placeholder="Full Name"
                  name="fullName"
                  value={fullName}
                  onChange={onChange}
                />
                {localErrors.fullName && (
                  <div className="invalid-feedback">{localErrors.fullName}</div>
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
  errors: PropTypes.object.isRequired,
};

export default SignUp;
