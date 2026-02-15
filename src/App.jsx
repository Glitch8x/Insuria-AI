import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Advisor from './pages/Advisor';
import Assessor from './pages/Assessor';
import Claims from './pages/Claims';
import Payments from './pages/Payments';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import Signup from './pages/Signup';

import LandingPage from './pages/LandingPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('insuria_auth') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="advisor" element={<Advisor />} />
          <Route path="assessor" element={<Assessor />} />
          <Route path="claims" element={<Claims />} />
          <Route path="payments" element={<Payments />} />
          <Route path="marketplace" element={<Marketplace />} />
        </Route>

        {/* Redirect everything else to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
