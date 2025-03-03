import React, { useState, useEffect } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function CreatingSession({ errors }) {
    const[title, setTitle] = useState("");
    const[host, setHost] = useState("");
    const[localErrors, setLocalErrors] = useState({});

    useEffect(() => {
        if(errors) {
            setLocalErrors(errors);
        }
    }, [errors]);

    const onChange = (e) => {
        const {name: fieldName, value: fieldValue} = e.target;

        if(fieldName === "title") {
            setTitle(fieldValue);
        } else if(fieldName === "host") {
            setHost(fieldValue);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const newSession = {
            title,
            host,
        };

        console.log("Creating new session:", newSession);
    };

    return (
      <div className="creating-session">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 mb-4 text-center">Create a Q&A Session</h1>
                    <form onSubmit={onSubmit} className="form-group">
                        <div className="form-group">
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
                            {localErrors.name && (
                                <div className="invalid-feedback">{localErrors.name}</div>
                            )}
                        </div>

                        <div className="form-group mt-3">
                            <input
                                type="text"
                                id="host"
                                name="host"
                                className={classnames("form-control form-control-lg", {
                                "is-invalid": localErrors.host,
                                })}
                                placeholder="Enter the host name"
                                value={host}
                                onChange={onChange}
                            />
                            {localErrors.host && (
                                <div className="invalid-feedback">{localErrors.host}</div>
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
    errors: PropTypes.object.isRequired,
}

export default CreatingSession;