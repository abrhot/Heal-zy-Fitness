import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    bloodType: '',
    currentWeight: '',
    goal: '',
    healthConditions: '',
    daysPerWeek: '',
    hoursPerDay: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        setLoading(false);
        // TODO: Redirect to login
        return;
      }

      try {
        const res = await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.msg || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setUserData(data);
        // Initialize form data with fetched user data
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '', // Keep email for display, not editable here
          bloodType: data.bloodType || '',
          currentWeight: data.currentWeight || '',
          goal: data.goal || '',
          healthConditions: data.healthConditions || '',
          daysPerWeek: data.workoutAvailability?.daysPerWeek || '',
          hoursPerDay: data.workoutAvailability?.hoursPerDay || '',
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please login.');
      // TODO: Redirect to login
      return;
    }

    const updatedData = {
      fullName: formData.fullName,
      bloodType: formData.bloodType,
      currentWeight: formData.currentWeight ? Number(formData.currentWeight) : undefined,
      goal: formData.goal,
      healthConditions: formData.healthConditions,
      workoutAvailability: {
        daysPerWeek: formData.daysPerWeek ? Number(formData.daysPerWeek) : undefined,
        hoursPerDay: formData.hoursPerDay ? Number(formData.hoursPerDay) : undefined,
      },
    };

    // Filter out undefined values from workoutAvailability if they are empty strings
    if (updatedData.workoutAvailability.daysPerWeek === undefined) delete updatedData.workoutAvailability.daysPerWeek;
    if (updatedData.workoutAvailability.hoursPerDay === undefined) delete updatedData.workoutAvailability.hoursPerDay;
    if (Object.keys(updatedData.workoutAvailability).length === 0) delete updatedData.workoutAvailability;


    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || `HTTP error! status: ${res.status}`);
      }

      setUserData(data); // Update displayed user data with response from server
      setSuccessMessage('Profile updated successfully!');
      // Re-initialize form with potentially updated data (especially if server modifies/sanitizes)
      setFormData({
        fullName: data.fullName || '',
        email: data.email || '',
        bloodType: data.bloodType || '',
        currentWeight: data.currentWeight || '',
        goal: data.goal || '',
        healthConditions: data.healthConditions || '',
        daysPerWeek: data.workoutAvailability?.daysPerWeek || '',
        hoursPerDay: data.workoutAvailability?.hoursPerDay || '',
      });

    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  // if (error) return <p style={{ color: 'red' }}>Error: {error}</p>; // Handled inline below

  return (
    <div>
      <h2>User Profile</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {userData ? (
        <>
          <p><strong>Full Name:</strong> {userData.fullName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Blood Type:</strong> {userData.bloodType}</p>
          <p><strong>Current Weight:</strong> {userData.currentWeight} kg</p>
          <p><strong>Goal:</strong> {userData.goal}</p>
          <p><strong>Health Conditions:</strong> {userData.healthConditions || 'N/A'}</p>
          <p>
            <strong>Workout Availability:</strong>
            {userData.workoutAvailability?.daysPerWeek} days/week,
            {userData.workoutAvailability?.hoursPerDay} hours/day
          </p>
          <hr />
          <h3>Update Profile</h3>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="bloodType">Blood Type:</label>
              <input type="text" name="bloodType" id="bloodType" value={formData.bloodType} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="currentWeight">Current Weight (kg):</label>
              <input type="number" name="currentWeight" id="currentWeight" value={formData.currentWeight} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="goal">Goal:</label>
              <select name="goal" id="goal" value={formData.goal} onChange={onChange}>
                <option value="">Select Goal</option>
                <option value="Weight Gain">Weight Gain</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Endurance">Endurance</option>
              </select>
            </div>
            <div>
              <label htmlFor="healthConditions">Health Conditions:</label>
              <input type="text" name="healthConditions" id="healthConditions" value={formData.healthConditions} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="daysPerWeek">Workout Days Per Week:</label>
              <input type="number" name="daysPerWeek" id="daysPerWeek" value={formData.daysPerWeek} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="hoursPerDay">Workout Hours Per Day:</label>
              <input type="number" name="hoursPerDay" id="hoursPerDay" value={formData.hoursPerDay} onChange={onChange} />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </>
      ) : (
        !loading && <p>Could not load profile data.</p> // Show this if not loading and no user data (and no error already shown)
      )}
    </div>
  );
};

export default Profile;
