import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
  render() {
    return (
        <div className="landing">
            <div className="light-overlay landing-inner text-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">VirtQ</h1>
                            <p className="lead">
                                Create your account to create a Q&A session or to join one!
                            </p>
                            <hr />
                                <Link className="btn btn-lg btn-primary mr-2" to="/register">
                                Sign Up
                                </Link>
                            <Link className="btn btn-lg btn-secondary mr-2" to="/login">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
