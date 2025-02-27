import React, { Component } from 'react';
import PropTypes from "prop-types";
import classnames from 'classnames';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.security?.validToken) {
            this.props.navigate("/dashboard"); // Use navigate instead of history.push
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.security?.validToken) {
            this.props.navigate("/dashboard");
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        console.log("Login request submitted", LoginRequest);
        this.props.navigate("/dashboard");  // Redirect to dashboard on form submit
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="login top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Email Address"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange}
                                    />
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <input type="submit" className="btn btn-info btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    errors: PropTypes.object.isRequired
};

export default Login;  // Wrap component with withRouter
