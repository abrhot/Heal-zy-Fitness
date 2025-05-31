import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    bloodType: '',
    currentWeight: '',
    goal: 'Weight Loss', // Default goal
    healthConditions: '',
    daysPerWeek: '',
    hoursPerDay: '',
  });

  const {
    fullName,
    email,
    password,
    bloodType,
    currentWeight,
    goal,
    healthConditions,
    daysPerWeek,
    hoursPerDay,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      fullName,
      email,
      password,
      bloodType,
      currentWeight: Number(currentWeight),
      goal,
      healthConditions,
      workoutAvailability: {
        daysPerWeek: Number(daysPerWeek),
        hoursPerDay: Number(hoursPerDay),
      },
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Registration successful:', data);
        // TODO: Handle successful registration (e.g., store token, redirect)
      } else {
        console.error('Registration failed:', data);
        // TODO: Display error message to user
      }
    } catch (err) {
      console.error('Registration error:', err);
      // TODO: Display error message to user
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <div>
          <label htmlFor="bloodType">Blood Type</label>
          <input
            type="text"
            name="bloodType"
            id="bloodType"
            value={bloodType}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="currentWeight">Current Weight (kg)</label>
          <input
            type="number"
            name="currentWeight"
            id="currentWeight"
            value={currentWeight}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="goal">Goal</label>
          <select name="goal" id="goal" value={goal} onChange={onChange} required>
            <option value="Weight Gain">Weight Gain</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Endurance">Endurance</option>
          </select>
        </div>
        <div>
          <label htmlFor="healthConditions">Health Conditions (optional)</label>
          <input
            type="text"
            name="healthConditions"
            id="healthConditions"
            value={healthConditions}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="daysPerWeek">Workout Days Per Week</label>
          <input
            type="number"
            name="daysPerWeek"
            id="daysPerWeek"
            value={daysPerWeek}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="hoursPerDay">Workout Hours Per Day</label>
          <input
            type="number"
            name="hoursPerDay"
            id="hoursPerDay"
            value={hoursPerDay}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
