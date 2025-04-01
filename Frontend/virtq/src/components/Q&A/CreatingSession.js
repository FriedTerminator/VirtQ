import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createQA } from "../../actions/q&aActions";

function CreatingSession({ createQA, errors }) {
    const[title, setTitle] = useState("");
    const[qaIdentifier, setQAIdentifier] = useState("");
    const[passcode, setPasscode] = useState("");
    const[localErrors, setLocalErrors] = useState({});

    useEffect(() => {
        if(errors) {
            setLocalErrors(errors);
        }
    }, [errors]);

    const onChange = (e) => {
        const {name, value} = e.target;
        switch(name) {
            case "title":
                setTitle(value);
                break;
            case "qaIdentifier": 
                setQAIdentifier(value);
                break;
            case "passcode":
                setPasscode(value);
                break;
            default:
                break;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const newSession = {
            title,
            qaIdentifier,
            passcode,
        };

        createQA(newSession);
    };

    return (
      <div className="creating-session">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 mb-4 text-center">Create a Q&A Session</h1>
                    <form onSubmit={onSubmit} className="form-group">
                        <div className="form-group mt-3">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": localErrors.title
                                })}
                                placeholder="Enter the Q&A name"
                                name="title"
                                value={title}
                                onChange={onChange}
                            />
                            {localErrors.title && (
                                <div className="invalid-feedback">{localErrors.title}</div>
                            )}
                        </div>

                        <div className="form-group mt-3">
                            <input
                                type="text"
                                id="qaIdentifier"
                                name="qaIdentifier"
                                className={classnames("form-control form-control-lg", {
                                "is-invalid": localErrors.qaIdentifier,
                                })}
                                placeholder="Unique Q&A ID"
                                value={qaIdentifier}
                                onChange={onChange}
                            />
                            {localErrors.qaIdentifier && (
                                <div className="invalid-feedback">{localErrors.qaIdentifier}</div>
                            )}
                        </div>

                        <div className="form-group mt-3">
                            <input
                                type="text"
                                id="passcode"
                                name="passcode"
                                className={classnames("form-control form-control-lg", {
                                "is-invalid": localErrors.passcode,
                                })}
                                placeholder="Please create a code to join the Q&A session"
                                value={passcode}
                                onChange={onChange}
                            />
                            {localErrors.passcode && (
                                <div className="invalid-feedback">{localErrors.passcode}</div>
                            )}
                        </div>
                        
                        <button type="submit" className="btn btn-info btn-block mt-3">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
}

CreatingSession.propTypes = {
    createQA: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors || {}
  })

export default connect(mapStateToProps, { createQA })(CreatingSession);