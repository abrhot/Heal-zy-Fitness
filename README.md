# Heal-zy Fitness Web Application

A modern fitness tracking web application built with Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- User authentication and profile management
- Workout tracking and planning
- Nutrition and meal planning
- Progress tracking and analytics
- Achievement system
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/heal-zy-fitness.git
cd heal-zy-fitness
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/heal-zy-fitness
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user
- GET /api/auth/check - Check authentication status

### User Profile
- GET /api/user/profile - Get user profile
- PATCH /api/user/profile - Update user profile
- PATCH /api/user/profile/image - Update profile image
- PATCH /api/user/password - Change password
- DELETE /api/user/account - Delete account

### Workouts
- GET /api/workouts/today - Get today's workouts
- GET /api/workouts/weekly - Get weekly workouts
- POST /api/workouts - Create new workout
- PATCH /api/workouts/:id - Update workout
- POST /api/workouts/:id/complete - Mark workout as complete
- DELETE /api/workouts/:id - Delete workout

### Nutrition
- GET /api/nutrition/today - Get today's nutrition plan
- PATCH /api/nutrition/:id - Update nutrition plan
- POST /api/nutrition/:id/meals/:mealId/complete - Mark meal as complete
- POST /api/nutrition/:id/meals/:mealId/foods - Add food to meal
- DELETE /api/nutrition/:id/meals/:mealId/foods/:foodId - Remove food from meal

### Progress
- GET /api/progress/today - Get today's progress
- GET /api/progress/weekly - Get weekly progress
- PATCH /api/progress/:id - Update progress
- POST /api/progress/:id/achievements - Add achievement
- GET /api/progress/achievements - Get all achievements
- GET /api/progress/summary - Get progress summary

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [Font Awesome](https://fontawesome.com/)
- [MongoDB](https://www.mongodb.com/)

- [Express.js](https://expressjs.com/) 

