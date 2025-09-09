import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createQA } from "../../actions/q&aActions";
import { useNavigate } from 'react-router-dom';

function CreatingSession({ createQA, errors }) {
    const navigate = useNavigate();

    const[name, setName] = useState("");
    const[qaIdentifier, setQAIdentifier] = useState("");
    const[passcode, setPasscode] = useState("");
    const[description, setDescription] = useState("");
    const[localErrors, setLocalErrors] = useState({});

    const descRef = useRef(null);
    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
        const el = descRef.current;
        if (el) {
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
        }
    };

    useEffect(() => {
        if(errors) {
            setLocalErrors(errors);
        }
    }, [errors]);

    const onChange = (e) => {
        const {name, value} = e.target;
        switch(name) {
            case "name":
                setName(value);
                break;
            case "qaIdentifier": 
                setQAIdentifier(value);
                break;
            case "passcode":
                setPasscode(value);
                break;
            case "description":
                setDescription(value);
                break;
            default:
                break;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const newSession = {
            name,
            qaIdentifier,
            passcode,
            description,
        };

        createQA(newSession, navigate);
    };

    return (
      <div className="creating-session">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 mb-4 text-center">Create a Q&A Session</h1>
                    <form onSubmit={onSubmit} className="form-group">
                        <div className="form-group mt-3">
                            <label htmlFor="description" className="form-label fw-semibold">Q&A Name</label>
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": localErrors.name
                                })}
                                placeholder="Enter the Q&A name"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                            {localErrors.name && (
                                <div className="invalid-feedback">{localErrors.name}</div>
                            )}
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="description" className="form-label fw-semibold">Q&A ID</label>
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
                            <label htmlFor="description" className="form-label fw-semibold">Passcode</label>
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

                        <div>
                            <label htmlFor="description" className="form-label fw-semibold">Session Description</label>
                            <textarea 
                                id="description"
                                name="description"
                                ref={descRef}
                                rows={3}
                                onChange={onDescriptionChange}
                                value={description}
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": localErrors.description,
                                })}
                                placeholder="Provide a detailed description of the Q&A (scope, allowed topics, examples)..."
                                style={{ overflow: "hidden", resize: "none" }}
                            />
                            {localErrors.description && (
                                <div className="invalid-feedback">{localErrors.description}</div>
                            )}
                            <div className="form-text text-muted">
                                Tip: Be specific. Clear scope helps filter off-topic questions.
                            </div>
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