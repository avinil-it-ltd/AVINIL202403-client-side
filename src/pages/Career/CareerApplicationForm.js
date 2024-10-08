// // src/components/CareerApplicationForm.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TopMenu from '../../core/TopMenu';
// import Footer from '../../core/footer';

// const CareerApplicationForm = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [careerId, setCareerId] = useState('');
//     const [resume, setResume] = useState(null); // To handle the file
//     const [careers, setCareers] = useState([]); // For the dropdown to choose a career
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         // Fetch available careers for dropdown
//         const fetchCareers = async () => {
//             try {
//                 const response = await axios.get('/api/careers');
//                 setCareers(response.data);
//             } catch (error) {
//                 console.error('Error fetching careers:', error);
//             }
//         };

//         fetchCareers();
//     }, []);

//     const handleFileChange = (e) => {
//         setResume(e.target.files[0]); // Get the selected file
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('email', email);
//         formData.append('careerId', careerId);
//         formData.append('resume', resume); // Append the file

//         try {
//             const response = await axios.post('/api/applications', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             setMessage('Application submitted successfully!');
//             // Reset form fields
//             setName('');
//             setEmail('');
//             setCareerId('');
//             setResume(null);
//         } catch (error) {
//             console.error('Error submitting application:', error);
//             setMessage('Failed to submit application. Please try again.');
//         }
//     };
// {/* <div><TopMenu /></div> */}
//     return (
//         <div className="container-fluid d-flex flex-column min-vh-100 p-0">
//             <TopMenu />

//             <div className="container my-5 p-4 bg-light rounded shadow-sm">
//                 <h2 className="text-center mb-4">Apply for a Career</h2>
//                 {message && <div className="alert alert-success text-center">{message}</div>}
//                 <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//                     <div className="mb-3">
//                         <label htmlFor="name" className="form-label">Name:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email:</label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="career" className="form-label">Career Position:</label>
//                         <select
//                             id="career"
//                             className="form-select"
//                             value={careerId}
//                             onChange={(e) => setCareerId(e.target.value)}
//                             required
//                         >
//                             <option value="">Select a career</option>
//                             {careers.map((career) => (
//                                 <option key={career._id} value={career._id}>
//                                     {career.title}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="resume" className="form-label">Upload Resume (PDF only):</label>
//                         <input
//                             type="file"
//                             className="form-control"
//                             id="resume"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary w-100">Submit Application</button>
//                 </form>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default CareerApplicationForm;



// src/components/CareerApplicationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopMenu from '../../core/TopMenu';
import Footer from '../../core/footer';
// import Footer from '../../core/Footer'; // Assuming 'Footer' is correctly imported

const CareerApplicationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [careerId, setCareerId] = useState('');
    const [resume, setResume] = useState(null);
    const [careers, setCareers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await axios.get('/api/careers');
                setCareers(response.data);
            } catch (error) {
                console.error('Error fetching careers:', error);
                setError('Unable to fetch career positions. Please try again later.');
            }
        };

        fetchCareers();
    }, []);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('careerId', careerId);
        formData.append('resume', resume);

        try {
            const response = await axios.post('/api/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Application submitted successfully!');
            // Reset only if successful submission
            setName('');
            setEmail('');
            setCareerId('');
            setResume(null);
            setError('');
        } catch (error) {
            console.error('Error submitting application:', error);
            setMessage('');
            setError(error.response?.data?.message || 'Failed to submit application. Please try again.');
        }
    };

    return (
        <div className="container-fluid d-flex flex-column min-vh-100 p-0">
            <TopMenu />

            <div className="container my-5 p-4 bg-light rounded shadow-sm">
                <h2 className="text-center mb-4">Apply for a Career</h2>
                {message && <div className="alert alert-success text-center" aria-live="polite">{message}</div>}
                {error && <div className="alert alert-danger text-center" aria-live="polite">{error}</div>}
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit Application</button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default CareerApplicationForm;
