import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Link className="nav-link" to="/inputquestion">
          Join
        </Link>
      </div>
    )
  }
}

export default Dashboard;