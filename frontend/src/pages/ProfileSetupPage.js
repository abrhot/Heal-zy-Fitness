// frontend/src/pages/ProfileSetupPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { useAuth } from '../contexts/AuthContext'; // To check if authenticated

const ProfileSetupPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    bloodType: '',
    weight: '', // in kg
    height: '', // in cm
    healthConditions: '', // Comma-separated string for simplicity
    goals: '', // e.g., 'weightLoss', 'weightGain', 'endurance'
    availabilityDays: '', // daysPerWeek
    availabilityHours: '', // hoursPerDay
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect if not authenticated
      return;
    }
    const fetchProfile = async () => {
      try {
        setInitialLoading(true);
        const profile = await userService.getProfile();
        setFormData({
          fullName: profile.fullName || '',
          bloodType: profile.bloodType || '',
          weight: profile.weight || '',
          height: profile.height || '',
          healthConditions: profile.healthConditions?.join(', ') || '',
          goals: profile.goals || '',
          availabilityDays: profile.availability?.daysPerWeek || '',
          availabilityHours: profile.availability?.hoursPerDay || '',
        });
      } catch (err) {
        setError('Failed to fetch profile data. You can still fill out the form.');
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProfile();
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const profileDataToSubmit = {
      fullName: formData.fullName,
      bloodType: formData.bloodType,
      weight: parseFloat(formData.weight) || undefined,
      height: parseFloat(formData.height) || undefined,
      healthConditions: formData.healthConditions.split(',').map(s => s.trim()).filter(s => s),
      goals: formData.goals,
      availability: {
        daysPerWeek: parseInt(formData.availabilityDays, 10) || undefined,
        hoursPerDay: parseFloat(formData.availabilityHours) || undefined,
      }
    };
    // Filter out undefined availability fields
    if (!profileDataToSubmit.availability.daysPerWeek) delete profileDataToSubmit.availability.daysPerWeek;
    if (!profileDataToSubmit.availability.hoursPerDay) delete profileDataToSubmit.availability.hoursPerDay;
    if (Object.keys(profileDataToSubmit.availability).length === 0) delete profileDataToSubmit.availability;


    try {
      await userService.updateProfile(profileDataToSubmit);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.msg || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Setup Your Profile</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full input-style" required />
        </div>
        {/* Weight & Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input type="number" name="weight" id="weight" value={formData.weight} onChange={handleChange} className="mt-1 block w-full input-style" placeholder="e.g., 70" />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input type="number" name="height" id="height" value={formData.height} onChange={handleChange} className="mt-1 block w-full input-style" placeholder="e.g., 175"/>
          </div>
        </div>
        {/* Blood Type */}
        <div className="mb-4">
            <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">Blood Type</label>
            <select name="bloodType" id="bloodType" value={formData.bloodType} onChange={handleChange} className="mt-1 block w-full input-style">
                <option value="">Select...</option>
                <option value="A+">A+</option> <option value="A-">A-</option>
                <option value="B+">B+</option> <option value="B-">B-</option>
                <option value="AB+">AB+</option> <option value="AB-">AB-</option>
                <option value="O+">O+</option> <option value="O-">O-</option>
            </select>
        </div>
        {/* Goals */}
        <div className="mb-4">
            <label htmlFor="goals" className="block text-sm font-medium text-gray-700">Primary Goal</label>
            <select name="goals" id="goals" value={formData.goals} onChange={handleChange} className="mt-1 block w-full input-style">
                <option value="">Select Goal...</option>
                <option value="weightLoss">Weight Loss</option>
                <option value="weightGain">Weight Gain</option>
                <option value="muscleGain">Muscle Gain</option>
                <option value="endurance">Endurance</option>
                <option value="fitnessMaintenance">Fitness Maintenance</option>
            </select>
        </div>
        {/* Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="availabilityDays" className="block text-sm font-medium text-gray-700">Workout Days/Week</label>
            <input type="number" name="availabilityDays" id="availabilityDays" value={formData.availabilityDays} onChange={handleChange} className="mt-1 block w-full input-style" placeholder="e.g., 3" />
          </div>
          <div>
            <label htmlFor="availabilityHours" className="block text-sm font-medium text-gray-700">Hours/Workout</label>
            <input type="number" step="0.5" name="availabilityHours" id="availabilityHours" value={formData.availabilityHours} onChange={handleChange} className="mt-1 block w-full input-style" placeholder="e.g., 1.5" />
          </div>
        </div>
        {/* Health Conditions */}
        <div className="mb-6">
          <label htmlFor="healthConditions" className="block text-sm font-medium text-gray-700">Health Conditions (comma-separated)</label>
          <input type="text" name="healthConditions" id="healthConditions" value={formData.healthConditions} onChange={handleChange} className="mt-1 block w-full input-style" placeholder="e.g., Asthma, Diabetes (optional)" />
        </div>

        <style jsx>{`
          .input-style {
            display: block;
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #D1D5DB; /* gray-300 */
            border-radius: 0.375rem; /* rounded-md */
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          }
          .input-style:focus {
            outline: none;
            border-color: #4F46E5; /* indigo-500 */
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3); /* focus:ring-indigo-500 with opacity */
          }
        `}</style>

        <button type="submit" disabled={loading || initialLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSetupPage;
