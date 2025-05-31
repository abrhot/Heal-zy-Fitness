import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }
    try {
      await login(email, password);
      navigate('/dashboard-placeholder'); // Redirect to placeholder dashboard
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-6 text-theme-accent-blue">Login</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-theme-bg-surface shadow-xl rounded-lg">
        {error && <p className="text-red-500 text-sm mb-4 bg-red-100 border border-red-400 p-2 rounded">{error}</p>}
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
        <div className="mb-6">
          <label className="block text-theme-text-light text-sm font-bold mb-2 text-left" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-theme-border rounded w-full py-2 px-3 bg-theme-primary-dark text-theme-text-light mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-theme-accent-blue"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-theme-primary-light hover:bg-theme-accent-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
        <Link className="inline-block align-baseline font-bold text-sm text-theme-accent-blue hover:text-theme-primary-light" to="/register">
          Don't have an account? Register
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
