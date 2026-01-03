import React from 'react';

function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: 'Sarah Johnson', team: 'Morning Runners', distance: '245 km', activities: 42, calories: 15240 },
    { rank: 2, name: 'Mike Chen', team: 'Cycling Warriors', distance: '238 km', activities: 38, calories: 14850 },
    { rank: 3, name: 'Emma Davis', team: 'Morning Runners', distance: '220 km', activities: 40, calories: 13900 },
    { rank: 4, name: 'John Smith', team: 'Swim Squad', distance: '195 km', activities: 35, calories: 12500 },
    { rank: 5, name: 'Lisa Anderson', team: 'Yoga Masters', distance: '180 km', activities: 50, calories: 11200 },
    { rank: 6, name: 'David Wilson', team: 'Cycling Warriors', distance: '175 km', activities: 32, calories: 10800 },
    { rank: 7, name: 'Anna Taylor', team: 'Morning Runners', distance: '168 km', activities: 38, calories: 10500 },
    { rank: 8, name: 'Tom Brown', team: 'Swim Squad', distance: '155 km', activities: 30, calories: 9800 },
  ];

  const teamLeaderboard = [
    { rank: 1, name: 'Morning Runners', members: 15, totalDistance: '1,234 km', avgDistance: '82.3 km' },
    { rank: 2, name: 'Cycling Warriors', members: 12, totalDistance: '1,156 km', avgDistance: '96.3 km' },
    { rank: 3, name: 'Swim Squad', members: 8, totalDistance: '645 km', avgDistance: '80.6 km' },
    { rank: 4, name: 'Yoga Masters', members: 20, totalDistance: '520 km', avgDistance: '26.0 km' },
  ];

  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank;
    }
  };

  return (
    <div className="fade-in">
      <h1 className="display-4 mb-4">Leaderboard</h1>

      {/* Top 3 Performers */}
      <div className="row mb-4">
        {leaderboardData.slice(0, 3).map((user) => (
          <div key={user.rank} className="col-md-4 mb-3">
            <div className="card border-warning">
              <div className="card-body text-center">
                <h1 className="display-1">{getMedalIcon(user.rank)}</h1>
                <h4 className="card-title">{user.name}</h4>
                <p className="card-text text-muted">{user.team}</p>
                <h5 className="text-primary">{user.distance}</h5>
                <div className="d-flex justify-content-around mt-3">
                  <div>
                    <strong>{user.activities}</strong>
                    <br />
                    <small className="text-muted">Activities</small>
                  </div>
                  <div>
                    <strong>{user.calories}</strong>
                    <br />
                    <small className="text-muted">Calories</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Individual Leaderboard */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Individual Rankings</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Team</th>
                  <th scope="col">Total Distance</th>
                  <th scope="col">Activities</th>
                  <th scope="col">Calories Burned</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr key={user.rank}>
                    <th scope="row">
                      <span className="badge bg-primary fs-6">{getMedalIcon(user.rank)}</span>
                    </th>
                    <td>
                      <strong>{user.name}</strong>
                    </td>
                    <td>
                      <span className="badge bg-info">{user.team}</span>
                    </td>
                    <td>{user.distance}</td>
                    <td>{user.activities}</td>
                    <td>{user.calories}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-person"></i> View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Team Leaderboard */}
      <div className="card">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Team Rankings</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Members</th>
                  <th scope="col">Total Distance</th>
                  <th scope="col">Avg Distance/Member</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamLeaderboard.map((team) => (
                  <tr key={team.rank}>
                    <th scope="row">
                      <span className="badge bg-success fs-6">{getMedalIcon(team.rank)}</span>
                    </th>
                    <td>
                      <strong>{team.name}</strong>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{team.members}</span>
                    </td>
                    <td>{team.totalDistance}</td>
                    <td>{team.avgDistance}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-success">
                        <i className="bi bi-people"></i> View Team
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
