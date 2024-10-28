import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const AppList = () => {
  const [applications, setApplications] = useState([]);
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [showShortlisted, setShowShortlisted] = useState(false); // New state for shortlisted filter
  const [showModal, setShowModal] = useState(false); // State for controlling the resume modal
  const [resumeUrl, setResumeUrl] = useState(''); // State to store the resume URL
  const [loading, setLoading] = useState(true); // Loading state


  useEffect(() => {
    fetchApplications();
    fetchCareers();
  }, [selectedCareer, searchTerm, showShortlisted]);



  const fetchCareers = async () => {
    try {
      const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/careers');
      console.log(response.data);

      setCareers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching careers:', error);
      setError('Failed to fetch careers.');
      setLoading(false);
    }
  };



  const handleShortlist = async (id, isShortlisted) => {
    try {
      await axios.put(`https://3pcommunicationsserver.vercel.app/api/applications/shortlist/${id}`, {
        isShortlisted: !isShortlisted,
      });
      fetchApplications(); // Refresh the list after updating shortlist status
    } catch (error) {
      console.error('Error updating shortlist status:', error);
      setError('Failed to update shortlist status.');
    }
  };


  // Example of the delete handler in your React component
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axios.delete(`https://3pcommunicationsserver.vercel.app/api/applications/${id}`);
        fetchApplications(); // Refresh the list after deleting
      } catch (error) {
        console.error('Error deleting application:', error);
        setError('Failed to delete application.');
      }
    }
  };



  // Filter applications based on selected career and search term
  const filteredApplications = applications.filter((application) => {
    const matchesCareer = selectedCareer ? application.careerId._id === selectedCareer : true;
    const matchesSearch = application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShortlisted = showShortlisted ? application.isShortlisted : true;

    return matchesCareer && matchesSearch && matchesShortlisted;
  });




  // Open modal and set resume URL
  const handleViewResume = (resume) => {
    setResumeUrl(resume);
    setShowModal(true);
  };




  const handleCloseModal = () => setShowModal(false);

  // Fetch filtered applications
  const fetchApplications = async () => {
    try {
      // Prepare parameters for the API request
      const params = {
        careerId: selectedCareer || undefined, // Send as undefined if no career is selected
        searchTerm: searchTerm || undefined, // Send as undefined if no search term is entered
        showShortlisted: showShortlisted || undefined, // Send as undefined if the shortlisted filter is not applied
      };

      // Fetch filtered applications
      const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/applications/filtered', { params });
      console.log(response.data);

      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to fetch applications. Please try again later.');
    }
  };

  // Re-fetch applications when filters change




  useEffect(() => {
    fetchApplications();
  }, [selectedCareer, searchTerm, showShortlisted]);




    // Custom Loader Component
  const Loader = () => (
    <div className="loader-container text-center mt-5">
      <div className="custom-loader"></div>
    </div>
  );

  if (loading) {
    return <Loader />;
  }






  return (

    <div className="container card shadow-lg p-3  mt-3">
      <h2 className="text-center mb-4" style={{ fontFamily: "Times New Roman" }}>Applications by Career</h2>

      {/* Filter Section */}
      <div className="filter-container d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 p-3 bg-light rounded shadow-sm">
        {/* Career Dropdown */}
        <div className="filter-group me-3 mb-2 mb-md-0 w-50">
          <label htmlFor="careerSelect" className="form-label fw-bold">Filter by Career</label>
          <select
            id="careerSelect"
            className="form-select"
            style={{ outline: "none", boxShadow: "none" }}
            value={selectedCareer}
            onChange={(e) => setSelectedCareer(e.target.value)}
          >
            <option value="">All Careers</option>
            {careers?.map((career) => (
              <option key={career._id} value={career._id}>
                {career.title}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="filter-group me-3 mb-2 mb-md-0 w-50">
          <label htmlFor="searchInput" className="form-label fw-bold">Search</label>
          <input
            id="searchInput"
            style={{ outline: "none", boxShadow: "none" }}
            type="text"
            className="form-control"
            placeholder="Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Shortlisted Button */}
        <div className="filter-group">
          <label  className="form-label fw-bold">Shortlist Button</label>
          <button
            className={`btn ${showShortlisted ? "btn-success" : "btn-outline-secondary"} w-100`}
            onClick={() => setShowShortlisted(!showShortlisted)}
          >
            {showShortlisted ? "Showing Shortlisted Only" : "Show Shortlisted Only"}
          </button>
        </div>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      {applications.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Career</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Shortlist</th>
              <th>Actions</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id} className={application.isShortlisted ? "table-success" : ""}>
                <td>{index + 1}</td>
                <td>
                  {application.photo ? (
                    <img
                      src={application.photo}
                      alt={`${application.name}'s photo`}
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                  ) : (
                    "No Photo"
                  )}
                </td>
                <td>{application.name}</td>
                <td>{application.careerId?.title || "N/A"}</td>
                <td>{application.email}</td>
                <td>
                  <button
                    type="button"
                    download=""
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleViewResume(application.resume)}
                  >
                    View Resume
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={application.isShortlisted}
                    onChange={() => handleShortlist(application._id, application.isShortlisted)}
                  />
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(application._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  {/* <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#applicationDetailsModal-${application._id}`}>
                    <FaEye />
                  </button> */}
                  <td>
                    <button
                      className="btn btn-primary btn-sm" // Change color as needed
                      data-bs-toggle="modal"
                      data-bs-target={`#applicationDetailsModal-${application._id}`}
                    >
                      <FaEye />
                    </button>

                    {/* Application details modal */}
                    <div
                      className="modal fade"
                      id={`applicationDetailsModal-${application._id}`}
                      tabIndex="-1"
                      aria-labelledby="applicationDetailsModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header bg-primary text-white">
                            <h5
                              className="modal-title ps-4"
                              id="applicationDetailsModalLabel"
                            >
                              Application Details
                            </h5>
                            <button
                              type="button"
                              className="btn-close btn-close-white"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body ps-5">
                            <p>
                              <strong>Name:</strong> {application.name}
                            </p>
                            <p>
                              <strong>Phone:</strong> {application.phoneNumber}
                            </p>
                            <p>
                              <strong>Email:</strong> {application.email}
                            </p>
                            <p>
                              <strong className="me-2">Resume:</strong>
                              <button
                                type="button"
                                download=""
                                className="btn btn-secondary"
                                onClick={() => handleViewResume(application.resume)}
                              >
                                View Resume
                              </button>
                            </p>
                            <p>
                              <strong>Career Position:</strong>{" "}
                              {application.careerId?.title || "N/A"}
                            </p>
                            <p>
                              <strong>Shortlisted:</strong>
                              <span
                                className={`badge ${application.isShortlisted
                                  ? "bg-success"
                                  : "bg-secondary"
                                  }`}
                              >
                                {application.isShortlisted ? "Yes" : "No"}
                              </span>
                            </p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No applications available.</p>
      )}

      {/* Resume Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>View Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Zoom>
            <img src={resumeUrl} alt={resumeUrl} className="img-fluid" />
          </Zoom>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" href={resumeUrl} target="_blank" download>
            Download Resume
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppList;