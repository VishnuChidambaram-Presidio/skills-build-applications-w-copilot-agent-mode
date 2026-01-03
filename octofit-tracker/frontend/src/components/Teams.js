import React, { useState, useEffect } from 'react';

function Teams() {
  const [showModal, setShowModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myTeams] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const endpoint = `${API_BASE_URL}/api/teams/`;
      console.log('Fetching teams from:', endpoint);
      
      const response = await fetch(endpoint);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched teams data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const teamsData = data.results || data;
      console.log('Processed teams data:', teamsData);
      setTeams(Array.isArray(teamsData) ? teamsData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fade-in text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Teams</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchTeams}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">Teams</h1>
        <button className="btn btn-success btn-lg" onClick={() => setShowModal(true)}>
          <i className="bi bi-people-fill"></i> Create Team
        </button>
      </div>

      {/* My Teams */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">My Teams</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {myTeams.map((team) => (
              <div key={team.id} className="col-md-6 mb-3">
                <div className="card h-100 border-success">
                  <div className="card-body">
                    <h5 className="card-title">{team.name}</h5>
                    <p className="card-text">
                      <strong>Role:</strong> <span className="badge bg-success">{team.role}</span>
                    </p>
                    <p className="card-text">
                      <strong>Joined:</strong> {team.joined}
                    </p>
                    <button className="btn btn-sm btn-primary me-2">View Details</button>
                    <button className="btn btn-sm btn-outline-danger">Leave Team</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Teams */}
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">All Teams</h5>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No teams found. Create your first team!</p>
              <button className="btn btn-success" onClick={() => setShowModal(true)}>
                Create Team
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <th scope="row">{team.id}</th>
                      <td>
                        <strong>{team.name}</strong>
                      </td>
                      <td>{team.description || '-'}</td>
                      <td>{new Date(team.created_date).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">
                          <i className="bi bi-box-arrow-in-right"></i> Join
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-eye"></i> View
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

      {/* Create Team Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Team</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="teamName" className="form-label">Team Name</label>
                    <input type="text" className="form-control" id="teamName" placeholder="Enter team name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="teamDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="teamDescription" rows="3" placeholder="Describe your team"></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="teamType" className="form-label">Team Type</label>
                    <select className="form-select" id="teamType">
                      <option>Running</option>
                      <option>Cycling</option>
                      <option>Swimming</option>
                      <option>Mixed Activities</option>
                    </select>
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="publicTeam" />
                    <label className="form-check-label" htmlFor="publicTeam">
                      Make this team public
                    </label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-success" onClick={() => setShowModal(false)}>
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
