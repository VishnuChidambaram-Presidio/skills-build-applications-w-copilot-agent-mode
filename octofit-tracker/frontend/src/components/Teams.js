import React, { useState } from 'react';

function Teams() {
  const [showModal, setShowModal] = useState(false);
  const [teams] = useState([
    { id: 1, name: 'Morning Runners', members: 15, totalDistance: '1,234 km', captain: 'John Doe', status: 'Active' },
    { id: 2, name: 'Cycling Warriors', members: 12, totalDistance: '2,456 km', captain: 'Jane Smith', status: 'Active' },
    { id: 3, name: 'Swim Squad', members: 8, totalDistance: '345 km', captain: 'Bob Johnson', status: 'Active' },
    { id: 4, name: 'Yoga Masters', members: 20, totalDistance: '0 km', captain: 'Alice Brown', status: 'Active' },
  ]);

  const [myTeams] = useState([
    { id: 1, name: 'Morning Runners', role: 'Member', joined: '2025-11-15' },
    { id: 3, name: 'Swim Squad', role: 'Captain', joined: '2025-10-20' },
  ]);

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
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Members</th>
                  <th scope="col">Total Distance</th>
                  <th scope="col">Captain</th>
                  <th scope="col">Status</th>
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
                    <td>
                      <span className="badge bg-info">{team.members} members</span>
                    </td>
                    <td>{team.totalDistance}</td>
                    <td>{team.captain}</td>
                    <td>
                      <span className="badge bg-success">{team.status}</span>
                    </td>
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
