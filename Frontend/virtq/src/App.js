import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import Login from './components/UserManagement/Login';
import './App.css';
import Landing from './components/Layout/Landing';
import SignUp from './components/UserManagement/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputQuestion from './components/UserManagement/QuestionInput/InputQuestion';
import CreatingSession from './components/Q&A/CreatingSession';
import { jwtDecode } from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import { setCurrentUser, logout } from './actions/securityActions';
import store from './store';
import Details from './components/Q&A/Details';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      setJWTToken(token); // Set Axios default Authorization header
      const decoded = jwtDecode(token);

      // Check if token expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/";
      } else {
        store.dispatch(setCurrentUser(decoded));
      }
    }
  }

  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing />}/>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/signup" element={<SignUp />}/>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/inputquestion" element={<InputQuestion />} />
          <Route exact path="/creating-session" element={<CreatingSession />} />
          <Route exact path="/details/:qaIdentifier" element={<Details />}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
