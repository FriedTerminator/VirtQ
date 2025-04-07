import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQAS, deleteQA } from '../actions/q&aActions';

function Dashboard({ qaList, getQAS, deleteQA }) {

  useEffect(() => {
    getQAS();
  }, [getQAS]);

  const handleDelete = (qaIdentifier) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      deleteQA(qaIdentifier);
    }
  };

  return (
    <div className="dashboard">
      <div className="container mt-4">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/creating-session" className="btn btn-success">
            + Create Session
          </Link>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card text-center mb-4">
              <div className="card-header bg-secondary text-white">
                <h2>Created Sessions</h2>
              </div>
              <div className="card-body">
                {qaList && qaList.length > 0 ? (
                  qaList.map(session => (
                    <div className="card mb-2" key={session.id}>
                      <div className="card-body text-start">
                        <h5 className="card-title">{session.name}</h5>
                        <p><strong>ID:</strong> {session.qaIdentifier}</p>
                        <p><strong>Passcode:</strong> {session.passcode}</p>
                        <p><strong>Created:</strong> {new Date(session.create_At).toLocaleDateString()}</p>

                        <Link to={`/details/${session.qaIdentifier}`} className="btn btn-primary me-2">
                          View Session
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(session.qaIdentifier)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No sessions created yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  qaList: state.qa.qaList
});

export default connect(mapStateToProps, { getQAS, deleteQA })(Dashboard);
