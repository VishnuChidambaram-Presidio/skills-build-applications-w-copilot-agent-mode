import React, { useState, useEffect } from 'react';

function Activities() {
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const endpoint = `${API_BASE_URL}/api/activities/`;
      console.log('Fetching activities from:', endpoint);
      
      const response = await fetch(endpoint);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched activities data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const activitiesData = data.results || data;
      console.log('Processed activities data:', activitiesData);
      setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return (
      <div className="fade-in text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Activities</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchActivities}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">Activities</h1>
        <button className="btn btn-primary btn-lg" onClick={handleShowModal}>
          <i className="bi bi-plus-circle"></i> Log New Activity
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <select className="form-select">
                <option>All Activities</option>
                <option>Running</option>
                <option>Cycling</option>
                <option>Swimming</option>
                <option>Walking</option>
                <option>Yoga</option>
              </select>
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-3">
              <button className="btn btn-outline-primary w-100">
                <i className="bi bi-funnel"></i> Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Activity Log</h5>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No activities found. Start logging your activities!</p>
              <button className="btn btn-primary" onClick={handleShowModal}>
                Log First Activity
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Distance</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Calories</th>
                    <th scope="col">Date</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <th scope="row">{activity.id}</th>
                      <td>
                        <span className="badge bg-info">{activity.activity_type || activity.type}</span>
                      </td>
                      <td>{activity.distance} km</td>
                      <td>{activity.duration} min</td>
                      <td>{activity.calories}</td>
                      <td>{new Date(activity.date || activity.activity_date).toLocaleDateString()}</td>
                      <td>{activity.notes || '-'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-warning me-1">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
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

      {/* Modal for Adding Activity */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Log New Activity</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="activityType" className="form-label">Activity Type</label>
                    <select className="form-select" id="activityType">
                      <option>Running</option>
                      <option>Cycling</option>
                      <option>Swimming</option>
                      <option>Walking</option>
                      <option>Yoga</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="distance" className="form-label">Distance (km)</label>
                    <input type="number" className="form-control" id="distance" step="0.1" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                    <input type="number" className="form-control" id="duration" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="calories" className="form-label">Calories Burned</label>
                    <input type="number" className="form-control" id="calories" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Notes</label>
                    <textarea className="form-control" id="notes" rows="3"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>
                  Save Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
