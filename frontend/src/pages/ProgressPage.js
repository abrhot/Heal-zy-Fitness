import React from 'react';

function ProgressPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-theme-accent-blue">Your Progress</h1>
      <p className="text-lg text-theme-text-light opacity-90">
        Visualize your fitness journey, view charts, and celebrate your achievements.
      </p>
      <p className="mt-4 text-sm text-theme-text-light opacity-70">
        (Content under development)
      </p>
    </div>
  );
}

export default ProgressPage;
