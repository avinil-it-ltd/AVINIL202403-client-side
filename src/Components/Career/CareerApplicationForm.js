// src/components/CareerApplicationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CareerApplicationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [careerId, setCareerId] = useState('');
    const [resume, setResume] = useState(null); // To handle the file
    const [careers, setCareers] = useState([]); // For the dropdown to choose a career
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch available careers for dropdown
        const fetchCareers = async () => {
            try {
                const response = await axios.get('/api/careers');
                setCareers(response.data);
            } catch (error) {
                console.error('Error fetching careers:', error);
            }
        };

        fetchCareers();
    }, []);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]); // Get the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('careerId', careerId);
        formData.append('resume', resume); // Append the file

        try {
            const response = await axios.post('/api/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Application submitted successfully!');
            // Reset form fields
            setName('');
            setEmail('');
            setCareerId('');
            setResume(null);
        } catch (error) {
            console.error('Error submitting application:', error);
            setMessage('Failed to submit application. Please try again.');
        }
    };

    return (
        <div>
            <h2>Apply for a Career</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Career Position:</label>
                    <select
                        value={careerId}
                        onChange={(e) => setCareerId(e.target.value)}
                        required
                    >
                        <option value="">Select a career</option>
                        {careers.map((career) => (
                            <option key={career._id} value={career._id}>
                                {career.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Upload Resume (PDF only):</label>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} required />
                </div>
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default CareerApplicationForm;
