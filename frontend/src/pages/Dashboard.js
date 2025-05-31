import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [workoutPlanData, setWorkoutPlanData] = useState(null);
  const [nutritionPlanData, setNutritionPlanData] = useState(null);
  const [weightHistoryData, setWeightHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentWeightInput, setCurrentWeightInput] = useState('');
  const [logWeightLoading, setLogWeightLoading] = useState(false);
  const [logWeightError, setLogWeightError] = useState('');
  const [logWeightSuccess, setLogWeightSuccess] = useState('');

  const fetchWeightHistory = async (token) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const historyRes = await fetch('/api/progress/history', { headers });
    if (historyRes.ok) {
      const historyData = await historyRes.json();
      setWeightHistoryData(historyData.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } else if (historyRes.status !== 404) {
      const historyError = await historyRes.json();
      console.error('Weight history fetch error:', historyError.message || historyRes.statusText);
      // Optionally set a general error if this fetch is critical for subsequent operations
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please login.');
        setLoading(false);
        // Consider redirecting to login page
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const [profileRes, workoutRes, nutritionRes, historyRes] = await Promise.all([
          fetch('/api/user/profile', { headers }),
          fetch('/api/plan/workout/view', { headers }),
          fetch('/api/plan/nutrition/view', { headers }),
          fetch('/api/progress/history', { headers }),
        ]);

        // Process profile data
        if (profileRes.ok) {
          setProfileData(await profileRes.json());
        } else if (profileRes.status !== 404) { // 404 means no profile, not necessarily an error to stop all
          const profileError = await profileRes.json();
          console.error('Profile fetch error:', profileError.msg || profileRes.statusText);
        }


        // Process workout plan data
        if (workoutRes.ok) {
          setWorkoutPlanData(await workoutRes.json());
        } else if (workoutRes.status !== 404) { // 404 means no plan, not an error
           const workoutError = await workoutRes.json();
           console.error('Workout plan fetch error:', workoutError.message || workoutRes.statusText);
        }


        // Process nutrition plan data
        if (nutritionRes.ok) {
          setNutritionPlanData(await nutritionRes.json());
        } else if (nutritionRes.status !== 404) { // 404 means no plan
            const nutritionError = await nutritionRes.json();
            console.error('Nutrition plan fetch error:', nutritionError.message || nutritionRes.statusText);
        }

        // Process weight history data - now called by fetchWeightHistory
        await fetchWeightHistory(token);

        // Check for critical errors that should set the main error state (excluding historyRes from direct check here)
        const criticalError = [profileRes, workoutRes, nutritionRes].find(res => !res.ok && res.status !== 404);
        // Prioritize profile error for the main dashboard error message
        if (!profileRes.ok && profileRes.status !== 404) {
            const errorData = await profileRes.json();
            throw new Error(errorData.msg || errorData.message || `API Error fetching profile: ${profileRes.statusText}`);
        } else if (criticalError) {
             const errorData = await criticalError.json(); // For other critical errors if profile was okay or 404
             throw new Error(errorData.msg || errorData.message || `API Error: ${criticalError.statusText}`);
        }


      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message || 'Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  const getTodaysWorkout = () => {
    if (!workoutPlanData || !workoutPlanData.plan || workoutPlanData.plan.length === 0) {
      return "No workout plan available. Generate one from your profile!";
    }
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Monday"
    const todaysActivity = workoutPlanData.plan.find(p => p.day === today);
    return todaysActivity ? todaysActivity.activities.join(', ') : "Rest day or activities not planned for today.";
  };

  const weightChartData = {
    labels: weightHistoryData.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightHistoryData.map(entry => entry.weight),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weight History',
      },
    },
     scales: {
        y: {
            beginAtZero: false // Adjust as needed, true if weight can't be negative
        }
    }
  };


  if (loading) return <p>Loading dashboard...</p>;
  if (error && !profileData) return <p style={{ color: 'red' }}>Error: {error} <Link to="/login">Login</Link></p>;

  const handleLogWeight = async (e) => {
    e.preventDefault();
    setLogWeightLoading(true);
    setLogWeightError('');
    setLogWeightSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setLogWeightError('No token found. Please login.');
      setLogWeightLoading(false);
      return;
    }

    const weightValue = parseFloat(currentWeightInput);
    if (isNaN(weightValue) || weightValue <= 0) {
      setLogWeightError('Please enter a valid positive number for weight.');
      setLogWeightLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/progress/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weight: weightValue }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || 'Failed to log weight.');
      }

      setLogWeightSuccess(data.msg || 'Weight logged successfully!');
      setCurrentWeightInput('');
      // Refresh weight history
      await fetchWeightHistory(token);

    } catch (err) {
      setLogWeightError(err.message);
    } finally {
      setLogWeightLoading(false);
    }
  };


  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>Partial data error: {error}</p>}

      {profileData ? (
        <>
          <h3>Welcome, {profileData.fullName}!</h3>
          <p>Your Goal: {profileData.goal}</p>
          <Link to="/profile">Edit Profile & Manage Plans</Link>
          <hr />
        </>
      ) : (
        <p>No profile data loaded. <Link to="/profile">Setup your profile.</Link></p>
      )}

      <div>
        <h4>Today's Workout</h4>
        <p>{getTodaysWorkout()}</p>
      </div>
      <hr />
      <div>
        <h4>Today's Meal Plan</h4>
        {nutritionPlanData && nutritionPlanData.meals ? (
          <>
            <p>Breakfast: {nutritionPlanData.meals.breakfast}</p>
            <p>Lunch: {nutritionPlanData.meals.lunch}</p>
            <p>Dinner: {nutritionPlanData.meals.dinner}</p>
            {nutritionPlanData.meals.snacks && <p>Snacks: {nutritionPlanData.meals.snacks}</p>}
          </>
        ) : (
          <p>No nutrition plan available. Generate one from your profile!</p>
        )}
      </div>
      <hr />
      <div>
        <h4>Weight History</h4>
        {/* Log Weight Form */}
        <form onSubmit={handleLogWeight} style={{ margin: '20px 0' }}>
          <div>
            <label htmlFor="currentWeightInput">Log Your Current Weight (kg): </label>
            <input
              type="number"
              id="currentWeightInput"
              value={currentWeightInput}
              onChange={(e) => setCurrentWeightInput(e.target.value)}
              step="0.1" // Allow decimals
              required
            />
            <button type="submit" disabled={logWeightLoading}>
              {logWeightLoading ? 'Logging...' : 'Log Weight'}
            </button>
          </div>
          {logWeightError && <p style={{ color: 'red', fontSize: '0.9em' }}>{logWeightError}</p>}
          {logWeightSuccess && <p style={{ color: 'green', fontSize: '0.9em' }}>{logWeightSuccess}</p>}
        </form>

        {weightHistoryData && weightHistoryData.length > 0 ? (
           <div style={{maxWidth: '600px', margin: 'auto'}}> {/* Constrain chart size */}
            <Line data={weightChartData} options={chartOptions} />
          </div>
        ) : (
          <p>No weight history logged yet. Start logging above!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
