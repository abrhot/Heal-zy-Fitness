import React from 'react';

function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      {/* 4rem is approx height of navbar, adjust if needed */}
      <h1 className="text-4xl font-bold mb-4 text-theme-accent-blue">Dashboard</h1>
      <p className="text-lg text-theme-text-light opacity-90">
        Welcome to your dashboard. Your personalized fitness and nutrition overview will be displayed here.
      </p>
      <p className="mt-4 text-sm text-theme-text-light opacity-70">
        (Content under development)
      </p>
    </div>
  );
}

export default DashboardPage;
