// Initialize Weight Chart
const initWeightChart = () => {
    const ctx = document.getElementById('weightChart').getContext('2d');
    const weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Weight Progress (kg)',
                data: [],
                borderColor: '#2196f3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Weekly Weight Progress'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
    return weightChart;
};

// Update Workout Statistics
const updateWorkoutStats = () => {
    // This would typically fetch data from an API
    const totalWorkouts = document.getElementById('totalWorkouts');
    const weeklyWorkouts = document.getElementById('weeklyWorkouts');
    const caloriesBurned = document.getElementById('caloriesBurned');
    
    // Example data
    totalWorkouts.textContent = '24';
    weeklyWorkouts.textContent = '3';
    caloriesBurned.textContent = '1,250';
};

// Mobile Navigation Toggle
const initMobileNav = () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const weightChart = initWeightChart();
    updateWorkoutStats();
    initMobileNav();
    
    // Example data for the chart
    weightChart.data.datasets[0].data = [75, 74.5, 74.8, 74.3, 74, 73.8, 73.5];
    weightChart.update();
});