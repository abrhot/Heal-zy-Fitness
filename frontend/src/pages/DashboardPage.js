// frontend/src/pages/DashboardPage.js
import React, { useEffect, useState, useCallback } from 'react'; // Add useCallback
import { useAuth } from '../contexts/AuthContext';
import userService from '../services/userService';
import planService from '../services/planService';
import progressService from '../services/progressService'; // Import progressService
import WorkoutPlanCard from '../components/WorkoutPlanCard';
import NutritionPlanCard from '../components/NutritionPlanCard';
import ProgressLogger from '../components/ProgressLogger'; // Import ProgressLogger
import WeightChart from '../components/WeightChart'; // Import WeightChart

const DashboardPage = () => {
  const { userToken } = useAuth();
  const [userName, setUserName] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [progressLogs, setProgressLogs] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  const fetchProgress = useCallback(async () => { // useCallback to memoize
    try {
      setLoadingProgress(true);
      const logs = await progressService.getProgressLogs();
      setProgressLogs(logs);
    } catch (error) {
      console.error("Failed to fetch progress logs:", error);
      setProgressLogs([]); // Set to empty or handle error state
    } finally {
      setLoadingProgress(false);
    }
  }, [userToken]); // Assuming userToken might be implicitly used by progressService via authService

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadingProfile(true);
      setLoadingPlans(true);
      // Fetch profile
      try {
        const profile = await userService.getProfile();
        setUserName(profile.fullName || 'User');
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUserName('User');
      } finally {
        setLoadingProfile(false);
      }

      // Fetch plans
      try {
        const [fetchedWorkoutPlan, fetchedNutritionPlan] = await Promise.all([
          planService.getWorkoutPlan(),
          planService.getNutritionPlan()
        ]);
        setWorkoutPlan(fetchedWorkoutPlan);
        setNutritionPlan(fetchedNutritionPlan);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        setWorkoutPlan({ error: "Could not load workout plan." });
        setNutritionPlan({ error: "Could not load nutrition plan." });
      } finally {
        setLoadingPlans(false);
      }

      // Fetch progress logs
      fetchProgress();
    };

    fetchDashboardData();
  }, [userToken, fetchProgress]); // Add fetchProgress to dependency array


  const handleLogAdded = (newLog) => {
    // Option 1: Refetch all logs
    // fetchProgress();
    // Option 2: Add to current state (more responsive, but ensure data consistency if sorting/filtering)
    setProgressLogs(prevLogs => [newLog, ...prevLogs].sort((a,b) => new Date(b.date) - new Date(a.date))); // Keep it sorted
  };


  return (
    <div className="container mx-auto p-4">
      {/* Greeting Section */}
      <section className="mb-8 p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800">
          Hello, {loadingProfile ? 'Loading...' : userName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back to your Heal-zy Fitness dashboard. Here's a summary of your activities.
        </p>
      </section>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Workout Plan Section */}
        <section className="lg:col-span-2 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Today's Workout Plan</h2>
          {loadingPlans ? <p>Loading workout plan...</p> : <WorkoutPlanCard plan={workoutPlan} />}
        </section>

        {/* Weekly Nutrition Overview Section */}
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Weekly Nutrition Overview</h2>
          {loadingPlans ? <p>Loading nutrition plan...</p> : <NutritionPlanCard plan={nutritionPlan} />}
        </section>

        {/* Weight History Graph Section */}
        <section className="md:col-span-3 p-6 bg-white rounded-lg shadow"> {/* Changed to md:col-span-3 for full width on medium screens */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Weight History</h2>
          <ProgressLogger onLogAdded={handleLogAdded} />
          {loadingProgress ? <p className="text-center py-4">Loading weight history...</p> : <WeightChart logs={progressLogs} />}
        </section>
      </div>

      {userToken && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700">Authentication Status:</h3>
          <p className="text-xs text-gray-600 break-all">
            You are logged in. (Token: {userToken.substring(0, 30)}...)
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
