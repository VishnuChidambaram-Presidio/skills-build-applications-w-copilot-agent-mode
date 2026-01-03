import React, { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const profileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    weight: 75,
    height: 180,
    goals: 'Run a marathon',
    joinDate: '2025-10-15',
  };

  const achievements = [
    { id: 1, title: 'First Activity', description: 'Logged your first activity', date: '2025-10-15', icon: '🎯' },
    { id: 2, title: '100km Milestone', description: 'Ran 100km total', date: '2025-11-20', icon: '🏃' },
    { id: 3, title: 'Team Player', description: 'Joined your first team', date: '2025-11-15', icon: '👥' },
    { id: 4, title: 'Consistency', description: '30 days streak', date: '2025-12-10', icon: '🔥' },
  ];

  const activityStats = [
    { activity: 'Running', count: 45, distance: '245 km', time: '1,250 min' },
    { activity: 'Cycling', count: 23, distance: '456 km', time: '980 min' },
    { activity: 'Swimming', count: 12, distance: '15 km', time: '420 min' },
    { activity: 'Walking', count: 30, distance: '89 km', time: '1,100 min' },
  ];

  return (
    <div className="fade-in">
      <h1 className="display-4 mb-4">My Profile</h1>

      <div className="row">
        {/* Profile Information */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-3">
                <div
                  className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                  style={{ width: '120px', height: '120px', fontSize: '48px' }}
                >
                  {profileData.name.charAt(0)}
                </div>
              </div>
              <h4 className="card-title">{profileData.name}</h4>
              <p className="text-muted">{profileData.email}</p>
              <button
                className="btn btn-primary w-100 mb-2"
                onClick={() => setIsEditing(!isEditing)}
              >
                <i className="bi bi-pencil"></i> {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              <button className="btn btn-outline-secondary w-100">
                <i className="bi bi-gear"></i> Settings
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card mt-3">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">Quick Stats</h6>
            </div>
            <div className="card-body">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>
                      <strong>Member Since</strong>
                    </td>
                    <td className="text-end">{profileData.joinDate}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Activities</strong>
                    </td>
                    <td className="text-end">110</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Distance</strong>
                    </td>
                    <td className="text-end">805 km</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Time</strong>
                    </td>
                    <td className="text-end">3,750 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-8">
          {/* Profile Form */}
          {isEditing ? (
            <div className="card mb-4">
              <div className="card-header bg-warning text-white">
                <h5 className="mb-0">Edit Profile</h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        defaultValue={profileData.name}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        defaultValue={profileData.email}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="age" className="form-label">
                        Age
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        defaultValue={profileData.age}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="weight" className="form-label">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="weight"
                        defaultValue={profileData.weight}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="height" className="form-label">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="height"
                        defaultValue={profileData.height}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="goals" className="form-label">
                        Fitness Goals
                      </label>
                      <textarea
                        className="form-control"
                        id="goals"
                        rows="3"
                        defaultValue={profileData.goals}
                      ></textarea>
                    </div>
                  </div>
                  <button type="button" className="btn btn-success me-2" onClick={() => setIsEditing(false)}>
                    <i className="bi bi-check-circle"></i> Save Changes
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="card mb-4">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">Profile Information</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Age:</strong>
                        </td>
                        <td>{profileData.age} years</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Weight:</strong>
                        </td>
                        <td>{profileData.weight} kg</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Height:</strong>
                        </td>
                        <td>{profileData.height} cm</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Goals:</strong>
                        </td>
                        <td>{profileData.goals}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Activity Breakdown */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Activity Breakdown</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-striped align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Activity</th>
                      <th scope="col">Count</th>
                      <th scope="col">Distance</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityStats.map((stat) => (
                      <tr key={stat.activity}>
                        <td>
                          <strong>{stat.activity}</strong>
                        </td>
                        <td>
                          <span className="badge bg-primary">{stat.count}</span>
                        </td>
                        <td>{stat.distance}</td>
                        <td>{stat.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <div className="card-header bg-warning text-white">
              <h5 className="mb-0">Achievements</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="col-md-6 mb-3">
                    <div className="card border-warning h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="fs-1 me-3">{achievement.icon}</div>
                          <div>
                            <h6 className="card-title mb-1">{achievement.title}</h6>
                            <p className="card-text small text-muted mb-1">
                              {achievement.description}
                            </p>
                            <small className="text-muted">{achievement.date}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
