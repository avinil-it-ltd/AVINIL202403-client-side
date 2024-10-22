import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import Swal from "sweetalert2";
const AppList = () => {
    const [applications, setApplications] = useState([]);
    const [careers, setCareers] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showShortlisted, setShowShortlisted] = useState(false); // New state for shortlisted filter

    useEffect(() => {
        fetchApplications();
        fetchCareers();
    }, [selectedCareer, searchTerm, showShortlisted]);

    // const fetchApplications = async () => {
    //     try {
    //         const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/applications/filter', {
    //             params: { careerId: selectedCareer, search: searchTerm, isShortlisted: showShortlisted }
    //         });
    //         setApplications(response.data);
    //     } catch (error) {
    //         console.error('Error fetching applications:', error);
    //         setError('Failed to fetch applications. Please try again later.');
    //     }
    // };

    // const fetchApplications = async () => {
    //     try {
    //         const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/applications', {
    //             params: {
    //                 careerId: selectedCareer || undefined, // Handle empty selection
    //                 search: searchTerm || undefined,
    //                 isShortlisted: showShortlisted ? showShortlisted : undefined
    //             }
    //         });
    //         console.log('Filtered applications:', response.data);
    //         setApplications(response.data);
    //     } catch (error) {
    //         console.error('Error fetching applications:', error);
    //         setError('Failed to fetch applications. Please try again later.');
    //     }
    // };


    const fetchCareers = async () => {
        try {
            const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/careers');
            console.log(response.data);

            setCareers(response.data);
        } catch (error) {
            console.error('Error fetching careers:', error);
            setError('Failed to fetch careers.');
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
       // Use SweetAlert for delete confirmation
       const result = await Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "Yes, delete it!",
       });

       if (result.isConfirmed) {
         try {
           await axios.delete(
             `https://3pcommunicationsserver.vercel.app/api/applications/${id}`
           );
           fetchApplications(); // Refresh the list after deleting
          Swal.fire({
            icon: "success",
            title: "Application deleted successfully!",
          
            confirmButtonText: "OK",
            confirmButtonColor: "#28a745",
          });
         } catch (error) {
           console.error("Error deleting application:", error);
           setError("Failed to delete application.");
           Swal.fire(
             "Error!",
             "There was a problem deleting the application.",
             "error"
           );
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





    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Applications by Career</h2>

        {/* Filter Section */}
        <div className="filter-container d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 p-3 bg-light rounded shadow-sm">
          {/* Career Dropdown */}
          <div className="filter-group me-3 mb-2 mb-md-0">
            <label htmlFor="careerSelect" className="form-label fw-bold">
              Filter by Career
            </label>
            <select
              id="careerSelect"
              className="form-select"
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
            >
              <option value="">All Careers</option>
              {careers.map((career) => (
                <option key={career._id} value={career._id}>
                  {career.title}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="filter-group me-3 mb-2 mb-md-0">
            <label htmlFor="searchInput" className="form-label fw-bold">
              Search
            </label>
            <input
              id="searchInput"
              type="text"
              className="form-control"
              placeholder="Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Shortlisted Button */}
          <div className="filter-group">
            <button
              className={`btn ${
                showShortlisted ? "btn-success" : "btn-outline-secondary"
              } w-100`}
              onClick={() => setShowShortlisted(!showShortlisted)}
            >
              {showShortlisted
                ? "Showing Shortlisted Only"
                : "Show Shortlisted Only"}
            </button>
          </div>
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        {applications.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th> {/* Serial Number */}
                <th>Photo</th>
                <th>Name</th>
                <th>Career</th>
                <th>Email</th>
                <th>Resume</th>
                <th>Shortlist</th>
                <th>Actions</th>
                <th>Details</th> {/* For the eye button */}
              </tr>
            </thead>

            <tbody>
              {applications.map((application, index) => (
                <tr
                  key={application._id}
                  className={application.isShortlisted ? "table-success" : ""}
                >
                  <td>{index + 1}</td> {/* Serial Number */}
                  <td>
                    {application.photo ? (
                      <img
                        src={application.photo}
                        alt={`${application.name}'s photo`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      "No Photo"
                    )}
                  </td>
                  <td>{application.name}</td>
                  <td>{application.careerId?.title || "N/A"}</td>
                  <td>{application.email}</td>
                  <td>
                    <button type="button" className="btn btn-secondary ">
                      <a
                        href={`https://3pcommunicationsserver.vercel.app/${application.resume
                          .replace(/\\/g, "/")
                          .replace("src/app/", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      ></a>
                      View Resume
                    </button>
                    {/* Modal to display the PDF */}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={application.isShortlisted}
                      onChange={() =>
                        handleShortlist(
                          application._id,
                          application.isShortlisted
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(application._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary" // Change color as needed
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
                                className="btn btn-secondary "
                              >
                                <a
                                  href={`https://3pcommunicationsserver.vercel.app/${application.resume
                                    .replace(/\\/g, "/")
                                    .replace("src/app/", "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-decoration-none text-primary"
                                ></a>
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
                                className={`badge ${
                                  application.isShortlisted
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
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No applications available.</p>
        )}
      </div>
    );
};

export default AppList;