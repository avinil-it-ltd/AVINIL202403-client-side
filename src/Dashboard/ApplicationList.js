// src/dashboard/ApplicationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Fetch applications from the backend
        const fetchApplications = async () => {
            try {
                const response = await axios.get('/api/applications'); // Adjust the API endpoint as needed
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Applications by Career</h2>
            {applications.length > 0 ? (
                <div className="list-group">
                    {applications.map((application) => (
                        <div key={application._id} className="list-group-item">
                            <h5>{application.career.title}</h5>
                            <p><strong>Name:</strong> {application.name}</p>
                            <p><strong>Email:</strong> {application.email}</p>
                            <p><strong>Resume:</strong> <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No applications available.</p>
            )}
        </div>
    );
};

export default ApplicationList;
