import React from 'react';

function Workouts() {
  const workoutPlans = [
    {
      id: 1,
      title: 'Beginner Running Plan',
      duration: '4 weeks',
      difficulty: 'Beginner',
      description: 'Get started with running with this beginner-friendly plan.',
      category: 'Running',
    },
    {
      id: 2,
      title: 'Advanced Cycling Training',
      duration: '8 weeks',
      difficulty: 'Advanced',
      description: 'Intensive cycling program for experienced cyclists.',
      category: 'Cycling',
    },
    {
      id: 3,
      title: 'Swimming Technique Improvement',
      duration: '6 weeks',
      difficulty: 'Intermediate',
      description: 'Improve your swimming technique and endurance.',
      category: 'Swimming',
    },
    {
      id: 4,
      title: 'Full Body Yoga Flow',
      duration: '30 days',
      difficulty: 'All Levels',
      description: 'Daily yoga routines for flexibility and strength.',
      category: 'Yoga',
    },
  ];

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

  return (
    <div className="fade-in">
      <h1 className="display-4 mb-4">Workout Plans</h1>

      {/* Today's Workout */}
      <div className="card mb-4 border-primary">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-calendar-check"></i> {todayWorkout.title}
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between mb-3">
                <span>
                  <strong>Type:</strong> <span className="badge bg-info">{todayWorkout.type}</span>
                </span>
                <span>
                  <strong>Duration:</strong> {todayWorkout.duration}
                </span>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Exercise</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Description</th>
                      <th scope="col">Complete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayWorkout.exercises.map((exercise, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{exercise.name}</strong>
                        </td>
                        <td>{exercise.duration}</td>
                        <td>{exercise.description}</td>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id={`exercise-${index}`} />
                            <label className="form-check-label" htmlFor={`exercise-${index}`}></label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn btn-success btn-lg w-100">
                <i className="bi bi-check-circle"></i> Mark as Complete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Available Workout Plans */}
      <h3 className="mb-3">Available Workout Plans</h3>
      <div className="row">
        {workoutPlans.map((plan) => (
          <div key={plan.id} className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <span className={`badge bg-${getDifficultyBadge(plan.difficulty)} mb-2`}>
                  {plan.difficulty}
                </span>
                <h5 className="card-title">{plan.title}</h5>
                <p className="card-text text-muted small">{plan.description}</p>
                <hr />
                <p className="mb-1">
                  <strong>Category:</strong> <span className="badge bg-secondary">{plan.category}</span>
                </p>
                <p className="mb-3">
                  <strong>Duration:</strong> {plan.duration}
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

      {/* My Active Plans */}
      <div className="card mt-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">My Active Plans</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Plan Name</th>
                  <th scope="col">Started</th>
                  <th scope="col">Progress</th>
                  <th scope="col">Next Workout</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Beginner Running Plan</strong>
                  </td>
                  <td>2025-12-01</td>
                  <td>
                    <div className="progress" style={{ height: '20px' }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: '65%' }}
                        aria-valuenow="65"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        65%
                      </div>
                    </div>
                  </td>
                  <td>Tomorrow</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">Continue</button>
                    <button className="btn btn-sm btn-outline-danger">Stop</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Full Body Yoga Flow</strong>
                  </td>
                  <td>2025-12-15</td>
                  <td>
                    <div className="progress" style={{ height: '20px' }}>
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: '30%' }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        30%
                      </div>
                    </div>
                  </td>
                  <td>Today</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">Continue</button>
                    <button className="btn btn-sm btn-outline-danger">Stop</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
