// frontend/src/components/NutritionPlanCard.js
import React from 'react';

const NutritionPlanCard = ({ plan }) => {
  if (!plan || !plan.dailyPlan || plan.dailyPlan.length === 0) {
    return <p className="text-gray-500">No nutrition plan available at the moment.</p>;
  }

  return (
    <div className="bg-green-50 p-4 rounded-lg shadow">
      {plan.message && <p className="text-sm text-green-700 mb-3">{plan.message}</p>}
      {plan.dailyPlan.map((dayMeal, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <h4 className="font-semibold text-lg text-green-800 mb-2">{dayMeal.day}</h4>
          <div className="space-y-1 text-sm">
            <p><strong className="text-gray-700">Breakfast:</strong> {dayMeal.breakfast.description} ({dayMeal.breakfast.calories} cal)</p>
            <p><strong className="text-gray-700">Lunch:</strong> {dayMeal.lunch.description} ({dayMeal.lunch.calories} cal)</p>
            <p><strong className="text-gray-700">Dinner:</strong> {dayMeal.dinner.description} ({dayMeal.dinner.calories} cal)</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NutritionPlanCard;
