import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      // API endpoint: https://${REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
      const endpoint = `${API_BASE_URL}/api/workouts/`;
      console.log('Fetching workouts from:', endpoint);
      
      const response = await fetch(endpoint);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched workouts data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const workoutsData = data.results || data;
      console.log('Processed workouts data:', workoutsData);
      setWorkoutPlans(Array.isArray(workoutsData) ? workoutsData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const todayWorkout = {
    title: "Today's Recommended Workout",
    type: 'Running',
    duration: '45 min',
    exercises: [
      { name: 'Warm-up', duration: '5 min', description: 'Light jogging' },
      { name: 'Intervals', duration: '30 min', description: '5x (4 min run + 2 min walk)' },
      { name: 'Cool-down', duration: '10 min', description: 'Walking and stretching' },
    ],
  };

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      Beginner: 'success',
      Intermediate: 'warning',
      Advanced: 'danger',
      'All Levels': 'info',
    };
    return colors[difficulty] || 'secondary';
  };

  if (loading) {
    return (
      <div className="fade-in text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Workouts</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchWorkouts}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h1 className="display-4 mb-4">Workout Plans</h1>

      {/* Available Workout Plans */}
      <h3 className="mb-3">Available Workout Plans</h3>
      {workoutPlans.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No workout plans available yet.</p>
        </div>
      ) : (
        <div className="row">
          {workoutPlans.map((plan) => (
            <div key={plan.id} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <span className={`badge bg-${getDifficultyBadge(plan.difficulty_level || plan.difficulty)} mb-2`}>
                    {plan.difficulty_level || plan.difficulty}
                  </span>
                  <h5 className="card-title">{plan.workout_name || plan.title}</h5>
                  <p className="card-text text-muted small">{plan.description}</p>
                  <hr />
                  <p className="mb-1">
                    <strong>Type:</strong> <span className="badge bg-secondary">{plan.workout_type || plan.category}</span>
                  </p>
                  <p className="mb-3">
                    <strong>Duration:</strong> {plan.duration} days
                  </p>
                  <button className="btn btn-primary btn-sm w-100 mb-2">
                    <i className="bi bi-play-circle"></i> Start Plan
                  </button>
                  <button className="btn btn-outline-secondary btn-sm w-100">
                    <i className="bi bi-eye"></i> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
