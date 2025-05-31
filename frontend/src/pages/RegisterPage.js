import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-6 text-theme-accent-blue">Create Account</h1>
      <form className="w-full max-w-sm p-8 bg-theme-bg-surface shadow-xl rounded-lg">
        <div className="mb-4">
          <label className="block text-theme-text-light text-sm font-bold mb-2 text-left" htmlFor="email">
            Email Address
          </label>
          <input className="shadow appearance-none border border-theme-border rounded w-full py-2 px-3 bg-theme-primary-dark text-theme-text-light leading-tight focus:outline-none focus:shadow-outline focus:border-theme-accent-blue" id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="mb-4">
          <label className="block text-theme-text-light text-sm font-bold mb-2 text-left" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border border-theme-border rounded w-full py-2 px-3 bg-theme-primary-dark text-theme-text-light leading-tight focus:outline-none focus:shadow-outline focus:border-theme-accent-blue" id="password" type="password" placeholder="******************" />
        </div>
        <div className="mb-6">
          <label className="block text-theme-text-light text-sm font-bold mb-2 text-left" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input className="shadow appearance-none border border-theme-border rounded w-full py-2 px-3 bg-theme-primary-dark text-theme-text-light mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-theme-accent-blue" id="confirm-password" type="password" placeholder="******************" />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button className="bg-theme-accent-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
            Register
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
