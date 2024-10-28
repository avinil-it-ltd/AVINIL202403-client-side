import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopMenu from '../../core/TopMenu';
import Footer from '../../core/Footer';
import { useParams } from 'react-router';

const CareerApplicationForm = () => {
    const { careerId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [careerTitle, setCareerTitle] = useState('');
    const [careerDetails, setCareerDetails] = useState({});
    const [resume, setResume] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch career details based on careerId
    useEffect(() => {
        const fetchCareerDetails = async () => {
            try {
                const response = await axios.get(`https://3pcommunicationsserver.vercel.app/api/careers/${careerId}`);
                const career = response.data.career;
                setCareerTitle(career.title);
                setCareerDetails(career);
            } catch (error) {
                console.error('Error fetching career details:', error);
                setError('Unable to fetch career details. Please try again later.');
            }
        };
        if (careerId) {
            fetchCareerDetails();
        }
    }, [careerId]);

    // Handle resume file selection
    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
            setError(''); // Clear any previous error
        } else {
            setError('Please select a valid file.');
        }
    };

    // Handle photo file selection
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setError(''); // Clear any previous error
        } else {
            setError('Please select a valid file.');
        }
    };

    // Upload image to Cloudinary and return the secure URL
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', '3pcommunications'); // Ensure your preset is correctly configured

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/avinilit/image/upload`, formData);
            console.log('Uploaded Image URL:', response.data.secure_url);
            return response.data.secure_url; // Return the URL of the uploaded image
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error; // Propagate the error for handling in the submit function
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            let photoUrl = '', resumeUrl = '';
            // Upload photo if selected
            if (photo) {
                photoUrl = await uploadImageToCloudinary(photo);
            }
            // Upload resume if selected
            if (resume) {
                resumeUrl = await uploadImageToCloudinary(resume);
            }

            // Create form data object
            const formData = {
                name,
                email,
                phoneNumber,
                careerId,
                resume: resumeUrl, // Cloudinary URL for the resume image
                photo: photoUrl // Cloudinary URL for the photo
            };

            // Send a POST request to the backend API
            const response = await axios.post('https://3pcommunicationsserver.vercel.app/api/applications', formData);

            // Set success message and reset form fields
            setMessage('Application submitted successfully!');
            setName('');
            setEmail('');
            setPhoneNumber('');
            setResume(null);
            setPhoto(null);
        } catch (error) {
            console.error('Error submitting application:', error);
            setError(error.response?.data?.message || 'Failed to submit application. Please try again.'); // Use a clearer error message
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };
    return (
        <div className="container-fluid d-flex flex-column min-vh-100 p-0">
            <TopMenu />

            <div className="main_section row m-5">
                {/* Left side details with scroll */}
                <div className="col-lg-6 col-md-12 px-5" style={{ maxHeight: '90vh', overflowY: 'scroll', scrollbarWidth: 'thin' }}>
                    <h3>{careerTitle}</h3>
                    {careerDetails && (
                        <>
                            <p>Vacancy: {careerDetails.vacancy || 'N/A'}</p>
                            <p>Salary: {careerDetails.salary || 'Negotiable'}</p>
                            <p>Job Location: {careerDetails.location || 'N/A'}</p>

                            <h5 className="mt-5">Description</h5>
                            <p>{careerDetails.description || 'N/A'}</p>

                            <h5 className='mt-5 mb-3'>Job Responsibilities</h5>
                            <p>{careerDetails.jobResponsibilities || 'N/A'}</p>

                            <h5>Education Required</h5>
                            <p>{careerDetails.educationRequired || 'N/A'}</p>

                            <h5>Experience Required</h5>
                            <ul>
                                {Array.isArray(careerDetails.experienceRequired) && careerDetails.experienceRequired.length > 0
                                    ? careerDetails.experienceRequired.map((exp, index) => (
                                        <li key={index}>{exp}</li>
                                    ))
                                    : <li>N/A</li>}
                            </ul>

                            <h5>Additional Requirements</h5>
                            <ul>
                                {Array.isArray(careerDetails.additionalRequirements) && careerDetails.additionalRequirements.length > 0
                                    ? careerDetails.additionalRequirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                    ))
                                    : <li>N/A</li>}
                            </ul>

                            <h5>Compensation & Other Benefits</h5>
                            <ul>
                                {Array.isArray(careerDetails.compensationBenefits) && careerDetails.compensationBenefits.length > 0
                                    ? careerDetails.compensationBenefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))
                                    : <li>N/A</li>}
                            </ul>

                            <h5>Age Requirement</h5>
                            <p>{careerDetails.ageRequirement || 'N/A'}</p>

                            <h5>Application Deadline</h5>
                            <p>{careerDetails.deadline ? new Date(careerDetails.deadline).toLocaleDateString() : 'N/A'}</p>
                        </>
                    )}
                </div>

                {/* Fixed form on the right */}
                {/* Fixed form on the right */}
                <div className="col-lg-6 col-md-12 p-5 bg-light rounded shadow-sm" style={{ position: 'sticky', top: '10px' }}>
                    <h2 className="text-center mb-4">Apply For This {careerTitle}</h2>
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {message && <div className="alert alert-success">{message}</div>}

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Upload Photo</label>
                            <input
                                type="file"
                                className="form-control"
                                id="photo"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="resume" className="form-label">Upload Resume</label>
                            <input
                                type="file"
                                className="form-control"
                                id="resume"
                                accept="application/pdf,image/*"
                                onChange={handleResumeChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CareerApplicationForm;
