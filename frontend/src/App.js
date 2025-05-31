import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Import new page
import WorkoutPage from './pages/WorkoutPage';   // Import new page
import NutritionPage from './pages/NutritionPage'; // Import new page
import ProgressPage from './pages/ProgressPage'; // Import new page
import AboutPage from './pages/AboutPage';     // Import new page
import UpdateProfilePage from './pages/UpdateProfilePage'; // Import new page

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile/update" element={<UpdateProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
