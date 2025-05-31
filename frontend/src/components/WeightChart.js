// frontend/src/components/WeightChart.js
import React from 'react';
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
  TimeScale // Import TimeScale for time-series data
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Register TimeScale
);

const WeightChart = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return <p className="text-center text-gray-500 py-8">No weight data logged yet to display a chart.</p>;
  }

  // Sort logs by date just in case they aren't already
  const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));

  const data = {
    labels: sortedLogs.map(log => new Date(log.date)), // Use Date objects for time scale
    datasets: [
      {
        label: 'Weight (kg)',
        data: sortedLogs.map(log => log.weight),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time', // Set x-axis to time scale
        time: {
          unit: 'day', // Display unit (day, week, month)
          tooltipFormat: 'MMM dd, yyyy', // Format for tooltips
          displayFormats: {
            day: 'MMM dd' // Format for display on the axis
          }
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Weight (kg)'
        },
        beginAtZero: false // Adjust if weights are typically far from zero
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weight Fluctuation Over Time'
      }
    }
  };

  // Parent div needs a defined height for chart.js to render correctly when maintainAspectRatio is false
  return (
    <div className="p-4 bg-white rounded-lg shadow" style={{ height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightChart;
