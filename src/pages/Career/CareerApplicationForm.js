import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopMenu from '../../core/TopMenu';
import Footer from '../../core/footer';

const CareerApplicationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // Add phoneNumber state
    const [careerId, setCareerId] = useState('');
    const [resume, setResume] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [careers, setCareers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await axios.get('https://3pcommunicationsserver.vercel.app/api/careers');
                setCareers(response.data);
            } catch (error) {
                console.error('Error fetching careers:', error);
                setError('Unable to fetch career positions. Please try again later.');
            }
        };
        fetchCareers();
    }, []);

    // Handle resume file selection
    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setResume(file);
        } else {
            setError('Only PDF files are allowed for resumes.');
        }
    };

    // Handle photo file selection
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setPhoto(file);
        } else {
            setError('Only JPEG and PNG files are allowed for photos.');
        }
    };

    // Upload image to Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', '3pcommunications'); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/avinilit/image/upload`, formData);
            return response.data.secure_url; // Return the uploaded image URL
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            let photoUrl;
            if (photo) {
                photoUrl = await uploadImageToCloudinary(photo);
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber); // Include phoneNumber in form data
            formData.append('careerId', careerId);
            formData.append('resume', resume);
            if (photoUrl) {
                formData.append('photo', photoUrl);
            }

            const response = await axios.post('https://3pcommunicationsserver.vercel.app/api/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Application submitted successfully!');
            // Reset form fields
            setName('');
            setEmail('');
            setPhoneNumber(''); // Reset phone number
            setCareerId('');
            setResume(null);
            setPhoto(null);
        } catch (error) {
            console.error('Error submitting application:', error);
            setError(error.response?.data?.error || 'Failed to submit application. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid d-flex flex-column min-vh-100 p-0">
            <TopMenu />
            <div className="container my-5 p-4 bg-light rounded shadow-sm">
                <h2 className="text-center mb-4">Apply for a Career</h2>
                {message && <div className="alert alert-success text-center" role="alert">{message}</div>}
                {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* New Phone Number Field */}
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="career" className="form-label">Career Position:</label>
                        <select
                            id="career"
                            className="form-select"
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
                    <div className="mb-4">
                        <label htmlFor="resume" className="form-label">Upload Resume (PDF only):</label>
                        <input
                            type="file"
                            className="form-control"
                            id="resume"
                            accept="application/pdf"
                            onChange={handleResumeChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photo" className="form-label">Upload Photo (JPEG, PNG only):</label>
                        <input
                            type="file"
                            className="form-control"
                            id="photo"
                            accept="image/jpeg, image/png"
                            onChange={handlePhotoChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CareerApplicationForm;
