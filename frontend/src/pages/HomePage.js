import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4"> {/* Adjusted background, text-white can be removed if theme-text-light is default */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to FitnessTracker!</h1>
        <p className="text-xl text-gray-300">Your ultimate companion for tracking fitness and nutrition.</p> {/* text-gray-400 to text-gray-300 */}
      </header>

      <main className="text-center mb-12">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-3">Track Your Progress</h2>
          <p className="text-gray-400">Monitor your workouts, log your meals, and see how far you've come.</p> {/* text-gray-500 to text-gray-400 */}
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-3">Achieve Your Goals</h2>
          <p className="text-gray-400">Set goals, stay motivated, and reach new heights in your fitness journey.</p> {/* text-gray-500 to text-gray-400 */}
        </section>
      </main>

      <footer className="text-center">
        <p className="text-lg mb-4">Ready to get started?</p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-theme-primary-light hover:bg-theme-accent-blue text-theme-text-light font-bold py-3 px-6 rounded-lg text-lg" // Updated button colors
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-theme-accent-green hover:bg-green-600 text-theme-text-light font-bold py-3 px-6 rounded-lg text-lg" // Updated button colors
          >
            Register
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
