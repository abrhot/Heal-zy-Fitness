import React from 'react';

function NutritionPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-theme-accent-blue">Nutrition Tracker</h1>
      <p className="text-lg text-theme-text-light opacity-90">
        Log your meals, track your calorie intake, and manage your dietary goals.
      </p>
      <p className="mt-4 text-sm text-theme-text-light opacity-70">
        (Content under development)
      </p>
    </div>
  );
}

export default NutritionPage;
