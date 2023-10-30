import React from 'react';
import './App.css';
import SideNav from './sideNav';
import InputForm from './InputForm';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { config } from './CONFIG/config';
import AuthRoute from './AUTHENTICATION/AuthRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './login';
import Creative from './Creative';

// Initialize Firebase app
initializeApp(config.firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth();

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute auth={auth}>
              <div className="grid-container">
                <SideNav />
                <InputForm />
              </div>
            </AuthRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/Creative"
          element={
            <div className="grid-container">
              <SideNav />
              <Creative />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
