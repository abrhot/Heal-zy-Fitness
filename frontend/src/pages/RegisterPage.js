import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    // For minimal MVP, we're not collecting bloodType, currentWeight etc. on this form.
    // The backend registerUser function can handle these being initially undefined.
    try {
      await register({ fullName, email, password });
      navigate('/dashboard-placeholder'); // Redirect to placeholder dashboard
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-6 text-theme-accent-blue">Create Account</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-theme-bg-surface shadow-xl rounded-lg">
        {error && <p className="text-red-500 text-sm mb-4 bg-red-100 border border-red-400 p-2 rounded">{error}</p>}
        <div className="mb-4">
          <label className="block text-theme-text-light text-sm font-bold mb-2 text-left" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="shadow appearance-none border border-theme-border rounded w-full py-2 px-3 bg-theme-primary-dark text-theme-text-light leading-tight focus:outline-none focus:shadow-outline focus:border-theme-accent-blue"
            id="fullName"
            type="text"
            placeholder="Your Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-theme-text-light text-sm font-bold mb-2 text-left" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border border-theme-border rounded w-full py-2 px-3 bg-theme-primary-dark text-theme-text-light leading-tight focus:outline-none focus:shadow-outline focus:border-theme-accent-blue"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-theme-text-light text-sm font-bold mb-2 text-left" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-theme-border rounded w-full py-2 px-3 bg-theme-primary-dark text-theme-text-light leading-tight focus:outline-none focus:shadow-outline focus:border-theme-accent-blue"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-theme-text-light text-sm font-bold mb-2 text-left" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border border-theme-border rounded w-full py-2 px-3 bg-theme-primary-dark text-theme-text-light mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-theme-accent-blue"
            id="confirm-password"
            type="password"
            placeholder="******************"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-theme-accent-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
        <Link className="inline-block align-baseline font-bold text-sm text-theme-accent-blue hover:text-theme-primary-light" to="/login">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
