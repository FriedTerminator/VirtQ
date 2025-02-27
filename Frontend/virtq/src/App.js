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

class App extends Component {
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
        </Routes>
      </Router>
    );
  }
}

export default App;
