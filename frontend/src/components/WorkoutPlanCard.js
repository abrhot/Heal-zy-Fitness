// frontend/src/components/WorkoutPlanCard.js
import React from 'react';

const WorkoutPlanCard = ({ plan }) => {
  if (!plan || !plan.dailyPlan || plan.dailyPlan.length === 0) {
    return <p className="text-gray-500">No workout plan available at the moment.</p>;
  }

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow">
      {plan.message && <p className="text-sm text-blue-700 mb-3">{plan.message}</p>}
      {plan.dailyPlan.map((dayPlan, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <h4 className="font-semibold text-lg text-blue-800 mb-2">{dayPlan.day}</h4>
          <ul className="list-disc list-inside pl-2 space-y-1">
            {dayPlan.activities.map((activity, actIndex) => (
              <li key={actIndex} className="text-sm text-gray-700">
                {activity.name}: {activity.sets} sets, {activity.reps || activity.duration}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WorkoutPlanCard;
