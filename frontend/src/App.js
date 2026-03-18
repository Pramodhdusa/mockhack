import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.js";
import './index.css';
import WelcomeLogin from './WelcomeLogin.js'
import AdminDashboard from "./AdminDashboard.js";
import UserDashboard from "./UserDashboard.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/welcomelogin" element={<WelcomeLogin/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;