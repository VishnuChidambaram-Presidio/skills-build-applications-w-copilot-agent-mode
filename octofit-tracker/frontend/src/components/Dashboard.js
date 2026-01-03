import React from 'react';

function Dashboard() {
  const stats = [
    { title: 'Total Activities', value: '127', icon: '🏃', color: 'primary' },
    { title: 'Total Distance', value: '342 km', icon: '📍', color: 'success' },
    { title: 'Calories Burned', value: '12,450', icon: '🔥', color: 'danger' },
    { title: 'Active Days', value: '45', icon: '📅', color: 'warning' },
  ];

  const recentActivities = [
    { id: 1, type: 'Running', distance: '5.2 km', duration: '32 min', calories: 420, date: '2025-12-29' },
    { id: 2, type: 'Cycling', distance: '15.8 km', duration: '45 min', calories: 380, date: '2025-12-28' },
    { id: 3, type: 'Swimming', distance: '1.2 km', duration: '40 min', calories: 350, date: '2025-12-27' },
    { id: 4, type: 'Walking', distance: '3.5 km', duration: '50 min', calories: 200, date: '2025-12-26' },
  ];

  return (
    <div className="fade-in">
      <h1 className="display-4 mb-4">Dashboard</h1>

      {/* Stats Cards */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className={`card stat-card border-${stat.color}`}>
              <div className="card-body">
                <h6 className="card-title">{stat.title}</h6>
                <h2 className="display-4">
                  <span className="me-2">{stat.icon}</span>
                  {stat.value}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities Table */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Recent Activities</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Type</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id}>
                    <th scope="row">{activity.id}</th>
                    <td>{activity.type}</td>
                    <td>{activity.distance}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.calories}</td>
                    <td>{activity.date}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2">View</button>
                      <button className="btn btn-sm btn-outline-secondary">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Quick Actions</h5>
        </div>
        <div className="card-body">
          <button className="btn btn-primary me-2 mb-2">
            <i className="bi bi-plus-circle"></i> Log Activity
          </button>
          <button className="btn btn-success me-2 mb-2">
            <i className="bi bi-people"></i> Join Team
          </button>
          <button className="btn btn-info me-2 mb-2">
            <i className="bi bi-trophy"></i> View Challenges
          </button>
          <button className="btn btn-warning mb-2">
            <i className="bi bi-heart-pulse"></i> Get Workout Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
