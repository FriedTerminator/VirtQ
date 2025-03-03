import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
      <div className="dashboard">
        <Link className="nav-link" to="/creating-session">
          Create Session
        </Link>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center md-2">
                <div className="card-header bg-secondary text-white">
                  <h2>Created Sessions</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default Dashboard;