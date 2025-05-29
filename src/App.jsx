// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './Register';
import LoginPage from './LoginPage';
import Landingpage from './Landingpage';
import AdminList from './COACHES.JSX';
import AdminDetail from './AdminDetail';
import Otp_regi from './Otp_regi';

const App = () => {
  // Lifted state to hold whatever you want to show in the Navbar

  return (
    <Router>
      {/* Always render Navbar and pass it the current userData */}

      <Routes>
        <Route path="/" element={<Landingpage />} />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Pass setUserData into LoginPage */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/coaches"
          element={<AdminList />}
        />
        <Route
          path="/coaches/:id"
          element={<AdminDetail />}
        />
        <Route
          path="/otp"
          element={<Otp_regi />}
        />
        {/* You no longer need a “/navbar” route; Navbar is always visible */}
      </Routes>
    </Router>
  );
};

export default App;
