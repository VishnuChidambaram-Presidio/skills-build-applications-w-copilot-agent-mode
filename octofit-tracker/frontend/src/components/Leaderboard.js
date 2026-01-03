import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const endpoint = `${API_BASE_URL}/api/leaderboard/`;
      console.log('Fetching leaderboard from:', endpoint);
      
      const response = await fetch(endpoint);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched leaderboard data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const leaderboardArr = data.results || data;
      console.log('Processed leaderboard data:', leaderboardArr);
      setLeaderboardData(Array.isArray(leaderboardArr) ? leaderboardArr : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="fade-in text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Leaderboard</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchLeaderboard}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h1 className="display-4 mb-4">Leaderboard</h1>

      {/* Top 3 Performers */}
      {leaderboardData.length >= 3 && (
        <div className="row mb-4">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <div key={user.id || index} className="col-md-4 mb-3">
              <div className="card border-warning">
                <div className="card-body text-center">
                  <h1 className="display-1">{getMedalIcon(index + 1)}</h1>
                  <h4 className="card-title">{user.user_name || user.name}</h4>
                  <p className="card-text text-muted">{user.team_name || user.team || 'No Team'}</p>
                  <h5 className="text-primary">{user.total_distance || user.distance} km</h5>
                  <div className="d-flex justify-content-around mt-3">
                    <div>
                      <strong>{user.total_activities || user.activities}</strong>
                      <br />
                      <small className="text-muted">Activities</small>
                    </div>
                    <div>
                      <strong>{user.total_calories || user.calories}</strong>
                      <br />
                      <small className="text-muted">Calories</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Individual Leaderboard */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Individual Rankings</h5>
        </div>
        <div className="card-body">
          {leaderboardData.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No leaderboard data available yet.</p>
            </div>
          ) : (
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
                  {leaderboardData.map((user, index) => (
                    <tr key={user.id || index}>
                      <th scope="row">
                        <span className="badge bg-primary fs-6">{getMedalIcon(index + 1)}</span>
                      </th>
                      <td>
                        <strong>{user.user_name || user.name}</strong>
                      </td>
                      <td>
                        <span className="badge bg-info">{user.team_name || user.team || 'No Team'}</span>
                      </td>
                      <td>{user.total_distance || user.distance} km</td>
                      <td>{user.total_activities || user.activities}</td>
                      <td>{user.total_calories || user.calories}</td>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
