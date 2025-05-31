// frontend/src/components/ProgressLogger.js
import React, { useState } from 'react';
import progressService from '../services/progressService';

const ProgressLogger = ({ onLogAdded }) => {
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Defaults to today
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight) {
      setError('Weight is required.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const newLog = await progressService.logProgress({
        weight: parseFloat(weight),
        date,
        notes
      });
      setSuccess('Progress logged successfully!');
      setWeight('');
      setNotes('');
      // setDate(new Date().toISOString().split('T')[0]); // Reset date or keep as is
      if (onLogAdded) {
        onLogAdded(newLog); // Callback to update parent component's state (e.g., refresh chart)
      }
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.msg || 'Failed to log progress.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Log Your Progress</h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-600">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full input-style"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-600">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            placeholder="e.g., 70.5"
            className="mt-1 block w-full input-style"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-600">Notes (Optional)</label>
          <textarea
            id="notes"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any notes about your week, how you felt, etc."
            className="mt-1 block w-full input-style"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Logging...' : 'Add Log'}
        </button>
      </form>
      <style jsx>{`
        .input-style {
          display: block;
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #D1D5DB; /* gray-300 */
          border-radius: 0.375rem; /* rounded-md */
        }
        .input-style:focus {
          outline: none;
          border-color: #4F46E5; /* indigo-500 */
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ProgressLogger;
