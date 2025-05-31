// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Import DashboardPage
import ProfileSetupPage from './pages/ProfileSetupPage'; // Import ProfileSetupPage
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const HomePageContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-center">Welcome to Heal-zy Fitness</h1>
    <p className="text-center mt-4">Your journey to a healthier life starts here.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePageContent />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Route for Dashboard */}
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route index element={<DashboardPage />} />
            </Route>

            {/* Protected Route for Profile Page */}
            <Route path="/profile" element={<PrivateRoute />}>
              <Route index element={<ProfileSetupPage />} />
            </Route>

            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
