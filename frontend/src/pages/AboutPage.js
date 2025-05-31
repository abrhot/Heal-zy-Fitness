import React from 'react';

function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-theme-accent-blue">About FitnessApp</h1>
      <p className="text-lg text-theme-text-light opacity-90 max-w-2xl">
        FitnessApp is your dedicated partner in achieving a healthier lifestyle. We provide tools to track your workouts, monitor your nutrition, and visualize your progress, all in one place.
      </p>
      <p className="mt-4 text-sm text-theme-text-light opacity-70">
        (Version 1.0.0 - Content under development)
      </p>
    </div>
  );
}

export default AboutPage;
