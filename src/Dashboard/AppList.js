import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    //         const response = await axios.get('http://localhost:5000/api/applications/filter', {
    //             params: { careerId: selectedCareer, search: searchTerm, isShortlisted: showShortlisted }
    //         });
    //         setApplications(response.data);
    //     } catch (error) {
    //         console.error('Error fetching applications:', error);
    //         setError('Failed to fetch applications. Please try again later.');
    //     }
    // };
    const fetchApplications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/applications/filter', {
                params: { careerId: selectedCareer, search: searchTerm, isShortlisted: showShortlisted }
            });
            console.log('Filtered applications:', response.data); // Add this line
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
            setError('Failed to fetch applications. Please try again later.');
        }
    };

    const fetchCareers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/careers');
            setCareers(response.data);
        } catch (error) {
            console.error('Error fetching careers:', error);
            setError('Failed to fetch careers.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/applications/${id}`);
            fetchApplications(); // Refresh the list after deleting
        } catch (error) {
            console.error('Error deleting application:', error);
            setError('Failed to delete application.');
        }
    };

    const handleShortlist = async (id, isShortlisted) => {
        try {
            await axios.put(`http://localhost:5000/api/applications/shortlist/${id}`, {
                isShortlisted: !isShortlisted,
            });
            fetchApplications(); // Refresh the list after updating shortlist status
        } catch (error) {
            console.error('Error updating shortlist status:', error);
            setError('Failed to update shortlist status.');
        }
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Applications by Career</h2>

            {/* Filter and Search */}
            {/* <div className="d-flex justify-content-between mb-4">
                <select
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

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

               
                <button
                    className={`btn ${showShortlisted ? 'btn-success' : 'btn-outline-secondary'}`}
                    onClick={() => setShowShortlisted(!showShortlisted)}
                >
                    {showShortlisted ? 'Showing Shortlisted Only' : 'Show Shortlisted Only'}
                </button>

            </div> */}
            <div className="filter-container d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 p-3 bg-light rounded shadow-sm">
                {/* Career Dropdown */}
                <div className="filter-group me-3 mb-2 mb-md-0">
                    <label htmlFor="careerSelect" className="form-label fw-bold">Filter by Career</label>
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
                    <label htmlFor="searchInput" className="form-label fw-bold">Search</label>
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
                        className={`btn ${showShortlisted ? 'btn-success' : 'btn-outline-secondary'} w-100`}
                        onClick={() => setShowShortlisted(!showShortlisted)}
                    >
                        {showShortlisted ? 'Showing Shortlisted Only' : 'Show Shortlisted Only'}
                    </button>
                </div>
            </div>

            {error && <p className="text-danger text-center">{error}</p>}

            {applications.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Career</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Resume</th>
                            <th>Shortlist</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr
                                key={application._id}
                                className={application.isShortlisted ? 'table-success' : ''}
                            >
                                <td>{application.careerId?.title || 'N/A'}</td>
                                <td>{application.name}</td>
                                <td>{application.email}</td>

                                <td>
                                    <a
                                        // href={`http://localhost:5000/${application.resume.replace('src\\app\\', '')}`}
                                        // target="_blank"
                                        className="btn btn-link p-0"
                                        rel="noopener noreferrer"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#pdfModal-${application._id}`}
                                    >
                                        View Resume
                                    </a>
                                    {/* Modal to display the PDF */}
                                    <div
                                        className="modal fade"
                                        id={`pdfModal-${application._id}`}
                                        tabIndex="-1"
                                        aria-labelledby="pdfModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">{application.name}'s resume</h5>
                                                    {/* <h5 className="modal-title">{`http://localhost:5000/${application.resume.replace(/\\/g, '/')}`}</h5> */}
                                                    {`http://localhost:5000/${application?.resume?.replace('src\\app\\', '')}`}
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                    ></button>
                                                </div>
                                                <div className="modal-body">
                                                    <iframe
                                                        src={`http://localhost:5000/${application?.resume?.replace('src\\app\\', '')}`}
                                                        title="PDF Viewer"
                                                        width="100%"
                                                        height="600px"
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <input
                                        type="checkbox"
                                        checked={application.isShortlisted}
                                        onChange={() => handleShortlist(application._id, application.isShortlisted)}
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
