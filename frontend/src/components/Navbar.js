import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const UserProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-300 hover:text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State for profile dropdown
  const navigate = useNavigate(); // Hook for navigation

  const navLinks = [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Workout', path: '/workout' },
    { title: 'Nutrition', path: '/nutrition' },
    { title: 'Progress', path: '/progress' },
    { title: 'About', path: '/about' },
  ];

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens)
    setIsProfileDropdownOpen(false); // Close dropdown
    navigate('/'); // Navigate to home
  };

  return (
    <nav className="bg-theme-bg-surface text-theme-text-light shadow-lg"> {/* Updated Navbar background and text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">FitnessApp</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-theme-text-light opacity-75 hover:bg-theme-primary-medium hover:text-theme-text-light hover:opacity-100" // Updated link colors
              >
                {link.title}
              </Link>
            ))}
            {/* Profile Icon and Dropdown */}
            <div className="ml-4 relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-1 rounded-full hover:bg-theme-primary-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-theme-bg-surface focus:ring-white" // Adjusted focus ring offset color
              >
                <UserProfileIcon />
              </button>
              {isProfileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  {/* This dropdown remains light-themed for now as per instructions */}
                  <Link
                    to="/profile/update"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Update Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-1 rounded-full text-theme-text-light opacity-75 hover:text-theme-text-light hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-theme-bg-surface focus:ring-white mr-3" // Adjusted mobile profile icon
              >
                <UserProfileIcon />
              </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-theme-text-light opacity-75 hover:text-theme-text-light hover:opacity-100 hover:bg-theme-primary-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" // Adjusted mobile menu button
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-theme-text-light opacity-75 hover:bg-theme-primary-medium hover:text-theme-text-light hover:opacity-100" // Updated mobile nav links
              >
                {link.title}
              </Link>
            ))}
            {/* Profile actions in Mobile Menu */}
            <div className="pt-4 pb-3 border-t border-theme-border"> {/* Adjusted border color */}
              <div className="flex items-center px-2 mb-2">
                <UserProfileIcon />
                <span className="ml-3 text-base font-medium text-theme-text-light opacity-75">User Name</span> {/* Placeholder, ensure text contrast */}
              </div>
              <Link
                to="/profile/update"
                onClick={() => {setIsMobileMenuOpen(false); setIsProfileDropdownOpen(false);}}
                className="block px-3 py-2 rounded-md text-base font-medium text-theme-text-light opacity-75 hover:bg-theme-primary-medium hover:text-theme-text-light hover:opacity-100" // Updated mobile profile links
              >
                Update Profile
              </Link>
              <button
                onClick={() => {handleLogout(); setIsMobileMenuOpen(false);}}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-theme-text-light opacity-75 hover:bg-theme-primary-medium hover:text-theme-text-light hover:opacity-100" // Updated mobile logout button
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
       {/* Profile Dropdown for Mobile - Appears near the mobile profile icon if clicked */}
       {isProfileDropdownOpen && !isMobileMenuOpen && (
            <div className="md:hidden origin-top-right absolute right-0 mt-12 mr-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  {/* This dropdown remains light-themed for now */}
                 <Link
                    to="/profile/update"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Update Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
            </div>
        )}
    </nav>
  );
}

export default Navbar;
